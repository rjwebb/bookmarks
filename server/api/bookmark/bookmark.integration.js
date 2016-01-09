'use strict';

var app = require('../..');
import request from 'supertest';

var newBookmark;

describe('Bookmark API:', function() {

  describe('GET /api/bookmarks', function() {
    var bookmarks;

    beforeEach(function(done) {
      request(app)
        .get('/api/bookmarks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bookmarks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      bookmarks.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/bookmarks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bookmarks')
        .send({
          name: 'Facebook',
          url: 'https://www.facebook.com'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBookmark = res.body;
          done();
        });
    });

    it('should respond with the newly created bookmark', function() {
      newBookmark.name.should.equal('Facebook');
      newBookmark.url.should.equal('https://www.facebook.com');
    });

  });

  describe('GET /api/bookmarks/:id', function() {
    var bookmark;

    beforeEach(function(done) {
      request(app)
        .get('/api/bookmarks/' + newBookmark._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          bookmark = res.body;
          done();
        });
    });

    afterEach(function() {
      bookmark = {};
    });

    it('should respond with the requested bookmark', function() {
      bookmark.name.should.equal('Facebook');
      bookmark.url.should.equal('https://www.facebook.com');
    });

  });

  describe('PUT /api/bookmarks/:id', function() {
    var updatedBookmark;

    beforeEach(function(done) {
      request(app)
        .put('/api/bookmarks/' + newBookmark._id)
        .send({
          name: 'Google',
          url: 'https://www.google.com'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBookmark = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBookmark = {};
    });

    it('should respond with the updated bookmark', function() {
      updatedBookmark.name.should.equal('Google');
      updatedBookmark.url.should.equal('https://www.google.com');
    });

  });

  describe('DELETE /api/bookmarks/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/bookmarks/' + newBookmark._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when bookmark does not exist', function(done) {
      request(app)
        .delete('/api/bookmarks/' + newBookmark._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
