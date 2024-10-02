#!/usr/bin/env node

const { program } = require('commander');
const { startDevServer } = require('../dist/cli/dev-server');
const { buildApp } = require('../dist/cli/build');

program
  .command('dev')
  .description('Start the development server')
  .action(() => {
    startDevServer().catch(error => {
      console.error('Error starting dev server:', error);
      process.exit(1);
    });
  });

program
  .command('build')
  .description('Build the application')
  .action(() => {
    buildApp().catch(error => {
      console.error('Error building app:', error);
      process.exit(1);
    });
  });

// Ajoutez d'autres commandes selon les besoins

program.parse(process.argv);