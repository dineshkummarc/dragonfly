
Element.prototype.___add=function()
{
  if(arguments.length)
  {
    if(arguments[0])
    {
      var doc=this.nodeType==9?this:this.ownerDocument;
      var i=0, ele=(typeof arguments[0])=='string'?doc.createElement(arguments[i++]):this; 
      var prop='', is_array=false, arg=arguments[i];
      while((is_array=arg instanceof  Array) ||
       (((typeof arg=='string') || (typeof arg=='number')) && (((arguments.length-i)%2)|| arguments[i+1] instanceof  Array ))
      )
      {
        if(is_array) 
        {
          ele.___add.apply(ele, arg); 
        }
        else if(arg) 
        {
          ele.appendChild(doc.createTextNode(arg));
        }
        arg=arguments[++i];
      }
      for( ;arguments[i] ; i+=2)
      {
        if(/string|number/.test(typeof arguments[i+1]))
        {
          ele.setAttribute(arguments[i], arguments[i+1]);
        }
        else
        {
          ele[arguments[i]]=arguments[i+1];
        }
      }
      if(this.nodeType==1 && (this!=ele))
      {
        this.appendChild(ele);
      }
      return ele;
    }
    else
    {
      return this.appendChild(doc.createTextNode(arguments[1]));
    }
  }
  return null;
}

Element.prototype.render=function(template)
{
  return this.___add.apply(this, template);
}

Element.prototype.clearAndRender=function(template)
{
  this.innerHTML='';
  return this.___add.apply(this, template);
}

Element.prototype.addClass=function(name)
{
  if(!(new RegExp('\\b'+name+'\\b')).test(this.className))
  {
    this.className=(this.className?this.className+' ':'')+name;
  }
  return this;
}

Element.prototype.removeClass=function(name)
{
  var re=new RegExp(name+' ?| ?'+name);
  if(re.test(this.className)) 
  {
    this.className=this.className.replace(re, '');
  }
  return this;
}

Element.prototype.hasClass=function(name)
{
  return (new RegExp('\\b'+name+'\\b')).test(this.className)
}

Element.prototype.releaseEvent=function(name)
{
  var event=document.createEvent('Events');
  event.initEvent(name, true, true);
  this.dispatchEvent(event);
}

Node.prototype.getNodeData=function(nodeName)
{
  var node=this.getElementsByTagName(nodeName)[0];
  if(node)
  {
    return node.textContent;
  }
  return null;
}

Node.prototype.getAttributeFromNode=function(nodeName, attr)
{
  var node=this.getElementsByTagName(nodeName)[0];
  if(node)
  {
    return node.getAttribute(attr);
  }
  return null;
}