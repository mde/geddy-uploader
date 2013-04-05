/*
 * Geddy JavaScript Web development framework
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

var formidable = require('formidable');

var Main = function () {
  var self = this;

  this.index = function (req, resp, params) {
    this.respond(params, {
      format: 'html'
    , template: 'app/views/main/index'
    });
  };

  this.upload = function(req, resp, params) {
    if (req.method.toLowerCase() == 'post') {
      var form = new formidable.IncomingForm();

      form.on('progress', function(bytesReceived, bytesExpected) {
        console.log('progress: '+bytesReceived + ' ' + bytesExpected);
      });

      form.parse(req.req, function(err, fields, files){
        if (err) {
          console.log(err);
          self.respond({params:params,error:err},{format:'json'});
        } else {
          console.log(fields,files);
          self.redirect('/');
        }
      });
    }
  }
};

exports.Main = Main;


