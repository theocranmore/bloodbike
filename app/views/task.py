from flask import Blueprint, render_template
from flask import request
from flask import jsonify
from sqlalchemy import exc as sqlexc
from app import models
from app import ma
from app import schemas
from flask_restful import reqparse, abort, Api, Resource
import flask_praetorian
from flask_praetorian import utilities
from app import db
from app import taskApi as api
from app import guard
from .viewfunctions import *
import functools
import inspect

from datetime import datetime
from app import db

parser = reqparse.RequestParser()
parser.add_argument('pickupAddressOne')
parser.add_argument('pickupAddressTwo')
parser.add_argument('pickupAddressTown')
parser.add_argument('pickupTown')
parser.add_argument('pickupPostcode')
parser.add_argument('destinationAddressOne')
parser.add_argument('destinationAddressTwo')
parser.add_argument('destinationTown')
parser.add_argument('destinationPostcode')
parser.add_argument('patch')
parser.add_argument('contactName')
parser.add_argument('contactNumber')
parser.add_argument('priority')
parser.add_argument('session')

taskSchema = schemas.TaskSchema()

mod = Blueprint('task', __name__, url_prefix='/api/v1/task')

class Task(Resource):
    @flask_praetorian.auth_required
    def get(self, _id):
        if not _id:
            return notFound()

        task = getTaskObject(_id)

        if (task):
            return jsonify(taskSchema.dump(task).data)
        else:
            return notFound(_id)

    @flask_praetorian.roles_required('admin')
    def delete(self, _id):
        pass

class Tasks(Resource):
    @flask_praetorian.roles_accepted('coordinator', 'admin')
    def post(self):
        args = parser.parse_args()
        task = models.Task()

        db.session.add(saveValues(task, args))
        db.session.commit()

        return {'id': task.id, 'message': 'Task {} created'.format(task.id)}, 201

api.add_resource(Task,
                 '/<_id>')
api.add_resource(Tasks,
                 's')
def getTaskObject(_id):
    return models.Task.query.filter_by(id=_id).first()

def saveValues(task, args):

    if args['pickupAddressOne']: task.pickupAddress1 = args['pickupAddressOne']
    if args['pickupAddressTwo']: task.pickupAddress2 = args['pickupAddressTwo']
    if args['pickupTown']: task.pickupAddressTown = args['pickupTown']
    if args['pickupPostcode']: task.pickupPostCode = args['pickupPostCode']
    if args['destinationAddressOne']: task.destinationAdress1 = args['destinationAddressOne']
    if args['destinationAddressTwo']: task.destinationAddress2 = args['destinationAddressTwo']
    if args['destinationTown']: task.destinationTown = args['destinationTown']
    if args['destinationPostcode']: task.destinationPostcode = args['destinationPostcode']
    if args['patch']: task.patch = args['patch']
    if args['contactName']: task.contactName = args['contactName']
    if args['contactNumber']: task.contactNumber = args['contactNumber']
    if args['priority']: task.priority = args['priorty']
    if args['session']: task.session = int(args['session'])

    return task
