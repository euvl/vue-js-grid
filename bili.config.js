module.exports = {
    format: 'umd,cjs,es',
    // true means compress for umd, cjs, iife
    compress: 'umd',
    plugins: ['vue', 'babel'],
    vue: {
        css: true
    }
}