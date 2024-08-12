import { Framework } from "@midwayjs/koa"
import { createApp, close, createHttpRequest } from "@midwayjs/mock"

describe('test/controller/user.test.ts', () => {
  let app;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it('Summary user failure', async () => {
    const result = await createHttpRequest(app).get('/user/summary');
    expect(result.body.success).toBe(false);
  });

  it('Summary user success', async () => {
    const result = await createHttpRequest(app).get('/user/summary').query({user: 'admin'});
    expect(result.body.success).toBe(true);
    expect(result.body.data).toBeTruthy();
  });

  it('Login failure 1', async () => {
    const result = await createHttpRequest(app).post('/user/login');
    expect(result.body.success).toBe(false);
  });

  it('Login failure 2', async () => {
    const result = await createHttpRequest(app).post('/user/login').send({user: 'Bob', password: '123'});
    expect(result.body.success).toBe(false);
  });

  it('Login success', async () => {
    const result = await createHttpRequest(app).post('/user/login').send({user: 'admin', password: '123456'});
    expect(result.body.success).toBe(true);
  });

  it('Register failure 1', async () => {
    const result = await createHttpRequest(app).post('/user/register');
    expect(result.body.success).toBeUndefined();
  });

  it('Register failure 2', async () => {
    const result = await createHttpRequest(app).post('/user/register').send({name: 'admin', password: '1'});
    expect(result.body.success).toBe(false);
  });

  it('Register success', async () => {
    const result = await createHttpRequest(app).post('/user/register').send({name: 'Test', password: '1'});
    expect(result.body.success).toBe(true);
  });

  it('Project addition failure 1', async () => {
    const result = await createHttpRequest(app).post('/user/project/add');
    expect(result.body.success).toBe(false);
  });

  it('Project addition failure 2', async () => {
    const result = await createHttpRequest(app).post('/user/project/add').send({user: 'test', project: 'test'});
    expect(result.body.success).toBe(false);
  });

  it('Project addition failure 3', async () => {
    const result = await createHttpRequest(app).post('/user/project/add').send({user: 'admin', project: 'Example'});
    expect(result.body.success).toBe(false);
  });

  it('Project addition success', async () => {
    await createHttpRequest(app).post('/project/create').send({user: 'admin', name: 'Test'});
    const result = await createHttpRequest(app).post('/user/project/add').send({user: 'admin', project: 'Test'});
    expect(result.body.success).toBe(true);
  });

  it('Project deletion failure 1', async () => {
    const result = await createHttpRequest(app).delete('/user/project/delete');
    expect(result.body.success).toBe(false);
  });

  it('Project deletion failure 2', async () => {
    const result = await createHttpRequest(app).delete('/user/project/delete').query({user: 'test', project: 'test'});
    expect(result.body.success).toBe(false);
  });

  it('Project deletion failure 3', async () => {
    const result = await createHttpRequest(app).delete('/user/project/delete').query({user: 'admin', project: 'null'});
    expect(result.body.success).toBe(false);
  });

  it('Project deletion success', async () => {
    const result = await createHttpRequest(app).delete('/user/project/delete').query({user: 'admin', project: 'Test'});
    await createHttpRequest(app).delete('/project/delete').query({user: 'admin', project: 'Test'});
    expect(result.body.success).toBe(true);
  });
});