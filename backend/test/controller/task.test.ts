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
    const result = await createHttpRequest(app).get('/task/query').query({project: 'test', task: '1'});
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
    const result = await createHttpRequest(app).post('/task/create').send({project: 'test', task: '1'});
    expect(result.body.success).toBeFalsy();
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
    const result = await createHttpRequest(app).delete('/task/delete').query({project: 'test', task: 'null'});
    expect(result.body.success).toBeFalsy();
  });
})