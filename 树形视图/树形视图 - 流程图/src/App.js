Vue.component('app', {
  template: `
  <div>
      <ul>
        <item v-for="(mod,idx) in treeData" v-bind:model="mod"></item>
      </ul>
  </div>
  `,
  data () {
    let dt = {
      treeData: [
        {
          name: 'html',
          children: [
            {
              name: 'head',
              children: [
                {
                  name: 'meta'
                }, {
                  name: 'title'
                }, {
                  name: 'style'
                }
              ]
            },
            {
              name: 'body',
              children: [
                {
                  name: 'div',
                  children: [
                    {
                      name: 'p',
                      children: [
                        {
                          name: 'p'
                        }, {
                          name: 'span'
                        }
                      ]
                    }, {
                      name: 'span'
                    }, {
                      name: 'span'
                    }, {
                      name: 'div',
                      children: [
                        {name: 'span'},
                        {name: 'span'}
                      ]
                    }
                  ]
                }, {
                  name: 'div'
                }
              ]
            }
          ]
        }
      ]
    }

    return dt
  }
});