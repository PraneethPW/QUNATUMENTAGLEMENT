import os
import psycopg2
from app.core.database import get_connection
from app.core.embeddings import embed_text
from app.services.gemini_service import GeminiService


class QAService:

    def __init__(self):
        self.gemini = GeminiService()

    def search_documents(self, query_embedding):

        conn = None
        cursor = None

        try:
            conn = get_connection()
            cursor = conn.cursor()

            cursor.execute("""
                SELECT content
                FROM documents
                ORDER BY embedding <-> %s
                LIMIT 5
            """, (query_embedding,))

            rows = cursor.fetchall()

            return [row[0] for row in rows]

        finally:

            if cursor:
                cursor.close()

            if conn:
                conn.close()

    def ask(self, question: str):

        # create embedding
        query_embedding = embed_text(question)

        # retrieve context
        docs = self.search_documents(query_embedding)

        context = "\n".join(docs)

        # generate answer
        answer = self.gemini.generate_answer(question, context)

        return {
            "answer": answer,
            "context": docs
        }