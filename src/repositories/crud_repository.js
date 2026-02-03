const { Logger } = require("../config");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
    } catch (err) {
      Logger.error(`Something went wrong`, err);
      throw err;
    }
  }

  async destroy(data) {
    try {
      const response = this.model.destroy({
        where: {
          id: data,
        },
      });
      return response;
    } catch (err) {
      Logger.error(`Something went wrong`, err);
      throw err;
    }
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
    } catch (err) {
      Logger.error(`Something went wrong`, err);
      throw err;
    }
  }

  async get(data) {
    try {
      const response = await this.model.findByPk(data);
      return response;
    } catch (err) {
      Logger.error(`Something went wrong`, err);
      throw err;
    }
  }

  async getAll() {
    try {
      const response = await this.model.findAll(data);
      return response;
    } catch (err) {
      Logger.error(`Something went wrong in CrudRepository`, err);
      throw err;
    }
  }

  async update(id, data) {
    try {
      const response = await this.model.update({
        where: {
          id: id,
        },
      });
      return response;
    } catch (err) {
      Logger.error(`Something went wrong`, err);
      throw err;
    }
  }
}

module.exports = CrudRepository;
