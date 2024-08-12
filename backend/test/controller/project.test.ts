import { Framework } from "@midwayjs/koa";
import { close, createApp, createHttpRequest } from "@midwayjs/mock";

describe('test/controller/project.test.ts', () => {
  let app;

  beforeAll(async () => {
    app = await createApp<Framework>();
  });

  afterAll(async () => {
    await close(app);
  });

  it('Summary project failure', async () => {
    const result = await createHttpRequest(app).get('/project/summary');
    expect(result.body.success).toBeFalsy();
  });

  it('Summary project success', async () => {
    const result = await createHttpRequest(app).get('/project/summary').query({project: 'Example'});
    expect(result.body.success).toBeTruthy();
    expect(result.body.data).toBeTruthy();
  });

  it('Overview project success', async () => {
    const result = await createHttpRequest(app).get('/project/overview');
    expect(result.body.success).toBeTruthy();
    expect(result.body.data).toBeTruthy();
  });

  it('Create project failure 1', async () => {
    const result = await createHttpRequest(app).post('/project/create');
    expect(result.body.status == 200).toBeFalsy();
  });

  it('Create project failure 2', async () => {
    const result = await createHttpRequest(app).post('/project/create').send({user: 'admin', name: 'Example'});
    expect(result.body.success).toBeFalsy();
  });

  it('Create project success', async () => {
    const result = await createHttpRequest(app).post('/project/create').send({user: 'admin', name: 'Test'});
    expect(result.body.success).toBeTruthy();
  });

  it('Delete project failure 1', async () => {
    const result = await createHttpRequest(app).delete('/project/delete');
    expect(result.body.success).toBeFalsy();
  });

  it('Delete project failure 2', async () => {
    const result = await createHttpRequest(app).delete('/project/delete').query({user: 'admin', project: 'null'});
    expect(result.body.success).toBeFalsy();
  });

  it('Delete project success', async () => {
    const result = await createHttpRequest(app).delete('/project/delete').query({user: 'admin', project: 'Test'});
    expect(result.body.success).toBeTruthy();
  });

  it('Create group failure 1', async () => {
    const result = await createHttpRequest(app).post('/project/group/create');
    expect(result.body.success).toBeFalsy();
  });

  it('Create group failure 2', async () => {
    const result = await createHttpRequest(app).post('/project/group/create').send({project: 'null', name: 'test'});
    expect(result.body.success).toBeFalsy();
  });

  it('Create group failure 3', async () => {
    const result = await createHttpRequest(app).post('/project/group/create').send({project: 'Example', name: 'To do'});
    expect(result.body.success).toBeFalsy();
  });

  it('Create group success', async () => {
    const result = await createHttpRequest(app).post('/project/group/create').send({project: 'Example', name: 'Test'});
    expect(result.body.success).toBeTruthy();
  });

  it('Delete group failure 1', async () => {
    const result = await createHttpRequest(app).delete('/project/group/delete');
    expect(result.body.success).toBeFalsy();
  });

  it('Delete group failure 2', async () => {
    const result = await createHttpRequest(app).delete('/project/group/delete').query({project: 'null', group: 'To do'});
    expect(result.body.success).toBeFalsy();
  });

  it('Delete group failure 3', async () => {
    const result = await createHttpRequest(app).delete('/project/group/delete').query({project: 'Example', group: 'null'});
    expect(result.body.success).toBeFalsy();
  });

  it('Delete group success', async () => {
    const result = await createHttpRequest(app).delete('/project/group/delete').query({project: 'Example', group: 'Test'});
    expect(result.body.success).toBeTruthy();
  });
});