import random
import string


class PostPyreBase:
    def __init__(self, **kwargs):
        if kwargs is not None:
            for k, v in kwargs:
                setattr(self, k, v)

    def do_update(self, user, data):
        for parameter in data.keys():
            if not hasattr(self, parameter):
                continue
            # Check to see if there is a protection method for this parameter
            protection = getattr(self, 'protect_{}'.format(parameter), None)
            # if so, run the method and see if we can update; if not, move on
            if protection:
                can_update = protection(user)
                if not can_update:
                    continue
            setattr(self, parameter, data[parameter])
        self.post_update()

    def post_update(self):
        pass

    def post_create(self, data):
        self.friendly_id = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(32))

    def make_friendly_id(self, string):
        return string.lower().replace(' ', '-')
