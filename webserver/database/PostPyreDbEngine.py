from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from webserver.database.DeclarativeBase import DeclarativeBase
import os


class PostPyreDbEngine:
    def default_connection_string():
        username = os.environ.get('DB_USER', '')
        password = os.environ.get('DB_PASSWORD', '')
        credentials = f'{username}:{password}' if username and password else ''
        server_location = os.environ.get('DB_LOCATION', 'localhost:5432')
        db_name = os.environ.get('DB_NAME', 'PostPyreExample')
        return f'postgres+psycopg2://${credentials}@{server_location}/{db_name}'

    def initialize(self):
        connection_string = os.environ.get('DATABASE_URL', PostPyreDbEngine.default_connection_string())
        self.engine = create_engine(connection_string, convert_unicode=True)
        maker = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
        self.db_session = scoped_session(maker)
        self.initialize_models()

    def initialize_models(self):
        DeclarativeBase.query = self.db_session.query_property()
        DeclarativeBase.metadata.create_all(bind=self.engine)

    def commit_creation(self, created):
        self.db_session.add(created)
        self.db_session.commit()

    def commit_deletion(self, to_delete):
        self.db_session.delete(to_delete)
        self.db_session.commit()
