from webserver.lib import some_testable_function


def test__some_testable_function ():
    assert len(some_testable_function(4)) == 4
