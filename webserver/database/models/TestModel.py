from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.dialects import postgresql
from webserver.database.DeclarativeBase import DeclarativeBase
from webserver.database.PostPyreBase import PostPyreBase

class TestModel(DeclarativeBase, PostPyreBase):
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
        body = request.get_json(force=True)
        new_model = TestModel()
        for parameter in body.keys():
            if hasattr(new_model, parameter):
                setattr(new_model, parameter, body[parameter])
        engine.commit_creation(new_model)
        return new_model.payloadize()
