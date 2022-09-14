# Usage

Create a json config file with the admin password in the files directory. It should look like:
```
{
  "admin": "your secret password"
}
```

Encrypt the file with ansible:

```
ansible-vault encrypt roles/install-couch/files/admin.json
```

Run ansible-playbook.

The image and container is registered as sudo user.
