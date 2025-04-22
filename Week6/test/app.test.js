const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app=require('../index')


describe('POST /book', async() => {

   it('should create a booking successfully', async() => {
    const res = await request(app)
      .post('/book')
      .send({
        name: "Kartik",
        hotel: "Hotel A",
        response: "Great experience!"
      });
   
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("message", "Booking saved");
    
  });

  it('should fail when name is missing', async () => {
    const res = await request(app)
      .post('/book')
      .send({
        hotel: "Hotel B",
        response: "Nice service"
      });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message");
  });

  it('should fail when hotel is missing', async () => {
    const res = await request(app)
      .post('/book')
      .send({
        name: "Arjun",
        response: "It was okay"
      });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message");
  });

  it('should fail when response is missing', async () => {
    const res = await request(app)
      .post('/book')
      .send({
        name: "Priya",
        hotel: "Hotel C"
      });

    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message");
  });
});
