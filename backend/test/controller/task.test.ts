import { Framework } from "@midwayjs/koa";
import { close, createApp, createHttpRequest } from "@midwayjs/mock";

describe('test/controller/user.test.ts', () => {
  let app;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it('Query task failure', async () => {
    const result = await createHttpRequest(app).get('/task/query');
    expect(result.body.success).toBeFalsy();
  });

  it('Query task success', async () => {
    const result = await createHttpRequest(app).get('/task/query').query({project: 'Example', task: 'Learn the function of each button'});
    expect(result.body.success).toBeTruthy();
    expect(result.body.data).toBeTruthy();
  });

  it('Create task failure 1', async () => {
    const result = await createHttpRequest(app).post('/task/create');
    expect(result.status == 200).toBeFalsy();
  });

  it('Create task failure 2', async () => {
    const result = await createHttpRequest(app).post('/task/create').send({project: 'null', task: 'null'});
    expect(result.body.success).toBeFalsy();
  });

  it('Create task failure 3', async () => {
    const result = await createHttpRequest(app).post('/task/create').send({project: 'Example', task: 'Learn the function of each button'});
    expect(result.body.success).toBeFalsy();
  });

  it('Create task success', async () => {
    const result = await createHttpRequest(app).post('/task/create').send({project: 'Example', task: 'Test'});
    expect(result.body.success).toBeTruthy();
  });

  it('Delete task failure 1', async () => {
    const result = await createHttpRequest(app).delete('/task/delete');
    expect(result.body.success).toBeFalsy();
  });

  it('Delete task failure 2', async () => {
    const result = await createHttpRequest(app).delete('/task/delete').query({project: 'null', task: 'null'});
    expect(result.body.success).toBeFalsy();
  });

  it('Delete task failure 3', async () => {
    const result = await createHttpRequest(app).delete('/task/delete').query({project: 'Example', task: 'null'});
    expect(result.body.success).toBeFalsy();
  });

  it('Delete task success', async () => {
    const result = await createHttpRequest(app).delete('/task/delete').query({project: 'Example', task: 'Test'});
    expect(result.body.success).toBeTruthy();
  });
})