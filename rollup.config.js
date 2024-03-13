import jsx from 'rollup-plugin-jsx';

export default {
  output: {
    file: 'build/app.js',
    format: 'esm', // ou 'cjs', 'amd', 'iife', etc., selon vos besoins
    sourcemap: true,
  },
  input: 'src/main.jsx',
  plugins: [
    jsx({ factory: 'React.createElement' }),
  ],
};
