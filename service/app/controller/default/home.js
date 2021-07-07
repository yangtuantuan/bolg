'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async getArticleList() {
    const sql = `
      SELECT
        article.id AS id,
        article.title AS title,
        article.introduce AS introduce,
        FROM_UNIXTIME(article.addTime, '%Y-%m-%d') AS addTime,
        article.view_count AS view_count,
        type.typeName AS typeName
      FROM
        article
      LEFT JOIN type ON article.type_id = type.id
      ORDER BY addTime DESC
    `;

    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: results
    }

  }
  async getArticleById() {
    const id = this.ctx.query.id;
    const sql = `
      SELECT
        article.id AS id,
        article.title AS title,
        article.introduce AS introduce,
        article.article_content AS article_content,
        FROM_UNIXTIME(
          article.addTime,
          '%Y-%m-%d'
        ) AS addTime,
        article.view_count AS view_count,
        type.typeName AS typeName,
        type.id AS typeId
      FROM
        article
      LEFT JOIN type ON article.type_id = type.id
      WHERE
        article.id = ${id}
    `
    const results = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: results[0]
    }
  }

  async getTypeInfo() {
    const sql = `
      SELECT
        id AS id,
        typeName AS typeName,
        orderNum AS orderNum
      FROM
        type
    `
    const results = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: results,
    }
  }
}

module.exports = HomeController;