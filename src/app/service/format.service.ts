import {Directory} from '../model/directory.model';

export function getDirectories(rows) {
  let data = [];
  for (let row of rows) {
    buildTree(row.path.split('/'), data);
  }
  return directoryFormat(data);
}

function buildTree(parts, treeNode) {
  if (parts.length === 0) {
    return;
  }
  if (parts[0] != "") {
    for (var i = 0; i < treeNode.length; i++) {
      if (parts[0] == treeNode[i].text) {
        buildTree(parts.splice(1, parts.length), treeNode[i].children);
        return;
      }
    }
    var newNode = {'text': parts[0], 'children': []};
    treeNode.push(newNode);
    buildTree(parts.splice(1, parts.length), newNode.children);
  }
  else {
    parts.splice(0, 1);
    buildTree(parts, treeNode);
  }
}

function recursiveFormat(d) {
  let subDirectories, files = [];
  while (d.children[0].children && d.children[0].children.length > 0) {
    subDirectories = directoryFormat(d.children);
    return new Directory(d.text, subDirectories, [])
  }
  let i = 0;
  for (let c of d.children) {  //children were objects, now they are strings
    d.children[i] = c.text;
    i++;
  }
  return new Directory(d.text, [], d.children);
}

function directoryFormat(data) {
  let directories = [];

  for (let d of data) {
    directories.push(recursiveFormat(d));
  }
  return directories;
}
