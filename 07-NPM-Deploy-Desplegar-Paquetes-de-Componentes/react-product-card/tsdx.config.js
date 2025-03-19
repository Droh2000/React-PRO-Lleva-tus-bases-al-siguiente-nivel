// Por defecto cuando se hace un buil o cualquier procedimiento va a pasar por este archivo, estos archivos estan importados con require()
// porque no es un archivo de JS ya que es de NODE
const postcss = require('rollup-plugin-postcss'); 
const images = require('@rollup/plugin-image'); 
module.exports = { 
  rollup(config, options) { 
    config.plugins = [ 
      postcss({ modules: true }), 
      images({ incude: ['**/*.png', '**/*.jpg'] }), 
      ...config.plugins, 
    ]; 
    return config; 
  }, 
}; 