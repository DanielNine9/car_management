import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { spec, request as requestPactum } from 'pactum';
// import '' from 'pactum'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    requestPactum.setBaseUrl('http://localhost:3000/');
  });

  describe('REGISTER FAILED', () => {
    it('(REGISTER ACCOUNT)should show err with all blank', () => {
      return spec().post('auth/register').expectStatus(400);
    });

    it('(REGISTER ACCOUNT FAILED)should show err with invalid email', () => {
      return spec().post('auth/register').expectStatus(400).withBody({
        username: 'test',
        email: 'testgmail.com',
        password: 'test',
        address: 'viet nam',
      });
    });

    // it('(RIGISTER ACCOUNT FAILED) should recieve status 409 when created account but email is already taken', () => {
    //   return spec()
    //     .post('auth/register')
    //     .withBody({
    //       username: 'test',
    //       email: 'test@gmail.com',
    //       password: 'test',
    //       address: 'viet nam',
    //     })
    //     .expectStatus(409);
    // });
  });

  // it('(RIGISTER ACCOUNT SUCCESSFULLY) should recieve status 201 when created account successfully', () => {
  //   return spec().post('auth/register').withBody({
  //     "username": "test"
  //     ,"email": "testkhongtrungemail@gmail.com"
  //     ,"password": "test"
  //     ,"address": "viet nam"

  //   }).expectStatus(201)

  // })

  // test case login
  describe('LOGIN', () => {
    it('(LOGIN ACCOUNT SUCCESSFULLY) should recieve status 200 when login SUCCESSFULLY', () => {
      return spec()
        .post('auth/login')
        .withBody({
          email: 'admin@gmail.com',
          password: '1234',
        })
        .expectStatus(201);
    });

    it('(LOGIN ACCOUNT FAILED) should recieve status 403 when login FAILED', () => {
      return spec()
        .post('auth/login')
        .withBody({
          email: 'admin@gmail.com',
          password: '12345',
        })
        .expectStatus(403);
    });
  });

  // test case get products
  describe('Get products', () => {
    it('(Get product successfully) should recieve status 200 when get /product { GET }', () => {
      return spec().get('product').expectStatus(200);
    });

    it('(Get product FAILED) should recieve status 404 when get /productA { GET }', () => {
      return spec().get('productA').expectStatus(404);
    });
  });

  // test case get product
  describe('Get product', () => {
    it('(Get product successfully) should recieve status 200 when get /product/1 { GET }', () => {
      return spec().get('product/1').expectStatus(200);
    });

    it('(Get product successfully) should recieve status 400 when get /product { GET }', () => {
      return spec().get('product/a').expectStatus(400);
    });

    it('(Get product successfully) should recieve status 404 when get /product { GET }', () => {
      return spec().get('product/123').expectStatus(404);
    });
  });

  // test case create product
  describe('Create product', () => {
    it('(Get product failed) should recieve status 404 when get /product { POST } and transmit blank data', () => {
      return spec().post('product/').withBody({}).expectStatus(401);
    });

    it('(Get product failed) should recieve status 404 when get /product { POST } and transmit all data so do not authorized', () => {
      return spec()
        .post('product/')
        .withBody({
          name: 'iphone22',
          price: 10000,
          source: 'american',
          type: 'PHONE',
          desc: ' sjdfkjaslfj',
          discount: 30,
          image:
            'https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg',
        })
        .expectStatus(401);
    });

    it('(Get product failed) should recieve status 404 when get /product { POST } and transmit all data so user do not the right', async () => {
      const token = await spec()
      .withHeaders('Content-type', 'application/json')
      .withBody({ email: 'user@gmail.com', password: '12341234' })
      .post('auth/login')
      .expectStatus(201)
      .returns('');


    return spec()
      .post('product/')
      .withBody({
        name: 'Ranger',
        price: 10000,
        source: 'Korean',
        type: 'four',
        desc: ' "haha',
        discount: 30,
        image:
          'https://fordlongbien.com/wp-content/uploads/2022/08/ford-ranger-xlt-2023-mau-xam-icon-fordlongbien_com.jpg',
      })
      .withBearerToken(token.access_token) 
      .expectStatus(403);
    });
    

    it('(Get product successfully) should recieve status 201 when get /product { POST } and transmit all data and user is the right', async () => {
      const token = await spec()
        .withHeaders('Content-type', 'application/json')
        .withBody({ email: 'admin@gmail.com', password: '1234' })
        .post('auth/login')
        .expectStatus(201)
        .returns('');

        return spec()
      .post('product/')
      .withBody({
        name: 'Ranger',
        price: 10000,
        source: 'Korean',
        type: 'four',
        desc: ' "haha',
        discount: 30,
        image:
          'https://fordlongbien.com/wp-content/uploads/2022/08/ford-ranger-xlt-2023-mau-xam-icon-fordlongbien_com.jpg',
      })
      .withBearerToken(token.access_token) 
      .expectStatus(201);
    });

    
    it('(Get product failed) should recieve status 400 when get /product { POST } user is the right but the data is blank', async () => {
      const token = await spec()
        .withHeaders('Content-type', 'application/json')
        .withBody({ email: 'admin@gmail.com', password: '1234' })
        .post('auth/login')
        .expectStatus(201)
        .returns('');


        return spec()
      .post('product/')
      .withBearerToken(token.access_token) 
      .expectStatus(400);
    });

    it('(Get product failed) should recieve status 400 when get /product { POST } user is the right but transmit missing data', async () => {
      const token = await spec()
        .withHeaders('Content-type', 'application/json')
        .withBody({ email: 'admin@gmail.com', password: '1234' })
        .post('auth/login')
        .expectStatus(201)
        .returns('');


        return spec()
      .post('product/')
      .withBearerToken(token.access_token) 
      .withBody({
        name: 'Ranger',
        price: 10000,
        source: 'Korean',

      })
      .expectStatus(400);
    });

  });

  afterAll(async () => {
    await prisma.$disconnect();
    app.close();
  });
});
