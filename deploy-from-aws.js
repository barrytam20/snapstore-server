var exec = require('ssh-exec');

var sshCrendentials = {
  user: 'ec2-user',
  host: 'ec2-52-201-217-159.compute-1.amazonaws.com',
  key: './snapstore-ec2-key.pem'
};

exec('cd snapstore-server; npm run deploy:s3', sshCrendentials).pipe(process.stdout);