#Konga

A boilerplate management utility for creating and reusing app templates.

The default template is a [Koa](http://koajs.com/)/[MongoDB](http://www.mongodb.org/)/[AngularJS](https://angularjs.org/)/[Sass](http://sass-lang.com/) boilerplate.

User-generated templates are not limited to any particular framework or library.

##Dependencies

[Node.js](https://nodejs.org/)  

###Default Boilerplate Dependencies

[MongoDB](http://www.mongodb.org/)  
[Ruby](https://www.ruby-lang.org)  
[Bundler](http://bundler.io/)

###Dependency Notes

Konga uses [Koa](http://koajs.com/), which requires Node 0.11.9 or greater, and that Node be run with the `--harmony` flag. See [Koa](http://koajs.com/) documentation for additional notes.

##Getting Started

```npm install -g konga```

##Usage

Konga accepts variants of two arguments ```new``` and ```save```.  

###New

konga new ***project_name*** [***template_name***]  

This uses an existing template to populate a new directory relative to the current working directory.  

For example, if you execute ```konga new project1``` from ```/home/user```, the default template will be used to populate a directory located at ```/home/user/project1```.  

###Save

konga save ***template_name***  

This recursively saves the current working directory and its children as a JSON template. If the current working directory or its children contain binary files, this will fail.  

For example, while in a project root, ```konga save project1``` will create a template called ```project1```. This template can be reused by executing ```konga new project_name project1```, where ***project_name*** is the desired name/location of the new project.  

###Caveats

Konga templates **do not** support binary files at this time.

##Tests

Coming soon.  