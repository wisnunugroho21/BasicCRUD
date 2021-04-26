/* eslint-disable require-jsdoc */
import model from '../models';

const {Todo} = model;

export default {
  async index(req, res) {
    try {
      if (req.isAuthenticated()) {
        const todo = await Todo.findAll();

        res.status(200).send(todo);
      } else {
        res.status(300).send('You need to login');
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async create(req, res) {
    try {
      if (req.isAuthenticated()) {
        const todo = await Todo.create({
          title: req.body.title,
        });

        res.status(201).send(todo);
      } else {
        res.status(300).send('You need to login');
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
