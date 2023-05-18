String.prototype.replaceBefore = function (delimiter: string, replacement?: string) {
  const index = this.indexOf(delimiter)
  if (index === -1)
    return this.toString()
  else
    return (replacement || '') + this.substring(this.indexOf(delimiter))
}

String.prototype.removePrefix = function (prefix: string) {
  if (this.startsWith(prefix))
    return this.substring(prefix.length)
  else
    return this.toString()
}

String.prototype.removeSuffix = function (suffix: string) {
  if (this.endsWith(suffix))
    return this.substring(0, this.length - suffix.length)
  else
    return this.toString()
}

String.prototype.removeSurrounding = function (prefix: string, suffix: string) {
  if (this.startsWith(prefix) && this.endsWith(suffix))
    return this.removePrefix(prefix).removeSuffix(suffix)
  else
    return this.toString()
}
