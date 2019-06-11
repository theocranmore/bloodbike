import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://localhost/bloodbike_dev'
        #'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_ACCESS_LIFESPAN = {'days': 24}

    JWT_REFRESH_LIFESPAN = {'days': 30}

    DEFAULT_DELETE_TIME = 10

    API_URL = 'http://localhost:5000'