from sqlalchemy import Column, Integer, String, Boolean
from webserver.database.DeclarativeBase import DeclarativeBase
from webserver.database.PostPyreBase import PostPyreBase


class TestModel(DeclarativeBase, PostPyreBase):
    __endpoint__ = '/test-model'
    __tablename__ = 'test'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    is_real = Column(Boolean)

    def payloadize(obj):
        return {
            'id': obj.id,
            'name': obj.name
        }

    def payloadize_all():
        for model in TestModel.query.all():
            yield model.payloadize()

    def create(request, engine):
        new_model = TestModel()
        return new_model.update(request, engine)

    def update(self, request, engine):
        body = request.get_json(force=True)
        for parameter in body.keys():
            if hasattr(self, parameter):
                setattr(self, parameter, body[parameter])
        engine.commit_creation(self)
        return self.payloadize()
