import { Command } from 'commander';

const args = new Command();

// agrego mediante command las flags de mis entornos

args.option('--env <env>', 'environment', 'prod'); // el ulitmo campo es el valor por defautl
args.option('--persistence <persistence>', 'persistence', 'mongo');
args.option('-u <user>', 'user');

args.parse();
export default args.opts();
