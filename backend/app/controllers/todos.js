/* eslint-disable require-jsdoc */
import model from '../models';

const {Todo} = model;

export default {
  async index(req, res) {
    try {
      const todo = await Todo.findAll();

      res.status(200).send(todo);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  async create(req, res) {
    try {
      const todo = await Todo.create({
        title: req.body.title,
      });

      res.status(201).send(todo);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
