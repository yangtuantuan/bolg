'use struct'

const Controller = require('egg').Controller

class MainController extends Controller {
  async index() {
    this.ctx.body = 'hi index'
  }

  async checkLogin() {
    let userName = this.ctx.request.body.userName;
    let password = this.ctx.request.body.password;
    const sql = `
      SELECT
        userName
      FROM
        admin_user
      WHERE
        userName = "${userName}"
      AND password = "${password}"
    `
    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      let openId = new Date().getTime()
      this.ctx.cookies.set('openId', new Date().getTime(), {
        maxAge: 0.5 * 3600 * 1000,
        overwrite: true,
      });
      this.ctx.body = { data: '登陆成功', openId }
    } else {
      this.ctx.cookies.set('openId', null)
      this.ctx.status = 500;
      this.ctx.body = { data: '登陆失败' }
    }
  }

  async outLogin() {
    this.ctx.body = { data: '退出成功' };
  }

  async checkOpenId() {
    let cOpenId = this.ctx.request.body.openId;
    let sOpenId = this.ctx.session.openId.openId;
    if (sOpenId && cOpenId == sOpenId) {
      this.ctx.body = { data: '已经登陆' }
    } else {
      this.ctx.body = { data: '没有登陆' }
    }
  }

  async getTypeInfo() {
    const resType = await this.app.mysql.select('type')
    this.ctx.body = {
      data: resType
    }
  }

  async addArticle() {
    const tmpArticle = this.ctx.request.body;
    tmpArticle.view_count = 0;
    const result = await this.app.mysql.insert('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId
    this.ctx.status = 200;
    this.ctx.body = {
      isScuccess: insertSuccess,
      insertId,
    }
    console.log(this.ctx.body);
  }
}

module.exports = MainController