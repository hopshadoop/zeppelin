/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

angular.module('zeppelinWebApp').service('baseUrlSrv', BaseUrlService);

function BaseUrlService() {
  this.getPort = function() {
    let port = Number(location.port);
    if (!port) {
      port = 80;
      if (location.protocol === 'https:') {
        port = 443;
      }
    }
    // Exception for when running locally via grunt
    if (port === process.env.WEB_PORT) {
      port = process.env.SERVER_PORT;
    }
    return port;
  };

  const getCookie = function(cname) {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  };


  this.getWebsocketUrl = function() {
    let wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    return wsProtocol + '//' + location.hostname + ':' + this.getPort() +
      '/hopsworks-api/zeppelin/ws/' + getCookie('projectID');
  };

  this.getBase = function() {
    return location.protocol + '//' + location.hostname + ':' + this.getPort() +
      '/hopsworks-api/zeppelin/ws/' + getCookie('projectID');
  };

  this.getRestApiBase = function() {
    return skipTrailingSlash(this.getBase());
  };

  const skipTrailingSlash = function(path) {
    return path.replace(/\/$/, '');
  };
}
