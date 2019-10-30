(function ()
{
      var maxForce = 0;
      var debounce = 0;
      var t;
      var _sendState = false;
      var __id = 0;
      var state;

      function Rock()
      {
            this._sendState = false;
            this.sendJump;
            this.sendRun;
            this.delay = 1000;
            this.ID = 0;
      }
      
      Rock.prototype.start = function ()
      {
            this.rock();
            this.shake();
            state = 'o';
      }
      
      Rock.prototype.rock = function ()
      {
            var self = this;
            window.addEventListener("devicemotion", function (event)
            {
                  event.preventDefault();
                  if (event.accelerationIncludingGravity)
                  {
                        var acc = event.accelerationIncludingGravity;
                        var force = getForce(event);
                        if (force > 2000)
                        {
                              if (force > maxForce)
                              {
                                    if (!self._sendState)
                                    {
                                          clearTimeout(self.ID);
                                          self.sendJump(Math.floor(force));
                                          self.ID = setTimeout(function ()
                                          {
                                                self._sendState = false;
                                          }, self.delay);
                                          self._sendState = true;
                                    }
                                    maxForce = force;
                              }
                        }
                        else
                        {
                              t = (new Date()).getTime();
                              if (t > debounce && Math.abs(maxForce) > 0)
                              {
                                    debounce = t + 1000;
                              }
                              maxForce = 0;
                        }
                  }
            });
      }
      Rock.prototype.shake = function ()
      {
            var self = this;
            window.addEventListener("deviceorientation", function (event)
            {
                  //event.preventDefault();
                  var minangle = 35;
                  var maxangle = 70;
                  var horizontal = 20;
                  var minbeta = 30;
                  var maxbeta = 50;
                  
                  if (event.beta > 70)
                  {
                        self.runState('S');
                  }
                  else
                  {
                        if (event.gamma > minangle)
                        {
                               
                              self.runState('D');
                        }
                        else if (event.gamma < -minangle)
                        {
                              self.runState('A');
                        }
                        else if (event.beta > horizontal + 25)
                        {
                              self.runState('S');
                              //self.sendRun(Math.min(Math.floor(event.gamma * 100 / maxangle) / 100, 1));
                        }
                        else if (event.beta < -20 + horizontal)
                        {
                              self.runState('W');
                        }
                        else
                        {
                             
                              self.runState('O');
                        }
                  }
            }, true);
      }

      Rock.prototype.runState = function(stateStr)
      {
            if (state != stateStr)
            {
                  state = stateStr;
                  this.sendRun(state);
            }
      }

      function getForce(e)
      {
            var hasGravity = (e.acceleration && true);
            var acc = e.acceleration || e.accelerationIncludingGravity;
            var total = acc.x + acc.y + acc.z;
            if (hasGravity)
            {
                  return total * 140;
            }
            else
            {
                  return (window.orientation < 0 ? total - 10 : total + 10) * 140;
            }
      }
      window.Rock = Rock;
})();