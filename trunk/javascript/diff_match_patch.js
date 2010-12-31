(function(){function diff_match_patch(){function a(){for(var b=0,c=1,d=2;c!=d;){b++;c=d;d<<=1}return b}this.Diff_Timeout=1;this.Diff_EditCost=4;this.Match_Threshold=0.5;this.Match_Distance=1E3;this.Patch_DeleteThreshold=0.5;this.Patch_Margin=4;this.Match_MaxBits=a()}
diff_match_patch.prototype.diff_main=function(a,b,c,d){if(typeof d=="undefined")d=this.Diff_Timeout<=0?Number.MAX_VALUE:(new Date).getTime()+this.Diff_Timeout*1E3;d=d;if(a==null||b==null)throw Error("Null input. (diff_main)");if(a==b){if(a)return[[0,a]];return[]}if(typeof c=="undefined")c=true;var e=c,f=this.diff_commonPrefix(a,b);c=a.substring(0,f);a=a.substring(f);b=b.substring(f);f=this.diff_commonSuffix(a,b);var h=a.substring(a.length-f);a=a.substring(0,a.length-f);b=b.substring(0,b.length-f);
a=this.diff_compute(a,b,e,d);c&&a.unshift([0,c]);h&&a.push([0,h]);this.diff_cleanupMerge(a);return a};
diff_match_patch.prototype.diff_compute=function(a,b,c,d){var e;if(!a)return[[1,b]];if(!b)return[[-1,a]];e=a.length>b.length?a:b;var f=a.length>b.length?b:a,h=e.indexOf(f);if(h!=-1){e=[[1,e.substring(0,h)],[0,f],[1,e.substring(h+f.length)]];if(a.length>b.length)e[0][0]=e[2][0]=-1;return e}if(f.length==1)return[[-1,a],[1,b]];if(e=this.diff_halfMatch(a,b)){var g=e[0];a=e[1];f=e[2];b=e[3];e=e[4];g=this.diff_main(g,f,c,d);d=this.diff_main(a,b,c,d);return g.concat([[0,e]],d)}if(c&&(a.length<100||b.length<
100))c=false;if(c){g=this.diff_linesToChars(a,b);a=g[0];b=g[1];g=g[2]}e=this.diff_bisect(a,b,d);if(c){this.diff_charsToLines(e,g);this.diff_cleanupSemantic(e);e.push([0,""]);b=a=c=0;for(f=g="";c<e.length;){switch(e[c][0]){case 1:b++;f+=e[c][1];break;case -1:a++;g+=e[c][1];break;case 0:if(a>=1&&b>=1){g=this.diff_main(g,f,false,d);e.splice(c-a-b,a+b);c=c-a-b;for(a=g.length-1;a>=0;a--)e.splice(c,0,g[a]);c+=g.length}a=b=0;f=g=""}c++}e.pop()}return e};
diff_match_patch.prototype.diff_bisect=function(a,b,c){for(var d=a.length,e=b.length,f=Math.ceil((d+e)/2),h={1:0},g={1:0},j=d-e,i=j%2!=0,k=0;k<f;k++){if((new Date).getTime()>c)break;for(var l=-k;l<=k;l+=2){var n;n=l==-k||l!=k&&h[l-1]<h[l+1]?h[l+1]:h[l-1]+1;for(var o=n-l;n<d&&o<e&&a.charAt(n)==b.charAt(o);){n++;o++}h[l]=n;if(i){var m=j-l;if(g[m]!==undefined){var p=d-g[m];if(n>=p){d=this.diff_main(a.substring(0,n),b.substring(0,o),false,c);return d.concat(this.diff_main(a.substring(n),b.substring(o),
false,c))}}}}for(m=-k;m<=k;m+=2){p=m==-k||m!=k&&g[m-1]<g[m+1]?g[m+1]:g[m-1]+1;for(n=p-m;p<d&&n<e&&a.charAt(d-p-1)==b.charAt(e-n-1);){p++;n++}g[m]=p;if(!i){l=j-m;if(h[l]!==undefined){n=h[l];o=n-l;p=d-p;if(n>=p){d=this.diff_main(a.substring(0,n),b.substring(0,o),false,c);return d.concat(this.diff_main(a.substring(n),b.substring(o),false,c))}}}}}return[[-1,a],[1,b]]};
diff_match_patch.prototype.diff_linesToChars=function(a,b){function c(g){for(var j="",i=0,k=-1,l=d.length;k<g.length-1;){k=g.indexOf("\n",i);if(k==-1)k=g.length-1;var n=g.substring(i,k+1);i=k+1;if(e.hasOwnProperty?e.hasOwnProperty(n):e[n]!==undefined)j+=String.fromCharCode(e[n]);else{j+=String.fromCharCode(l);e[n]=l;d[l++]=n}}return j}var d=[],e={};d[0]="";var f=c(a),h=c(b);return[f,h,d]};
diff_match_patch.prototype.diff_charsToLines=function(a,b){for(var c=0;c<a.length;c++){for(var d=a[c][1],e=[],f=0;f<d.length;f++)e[f]=b[d.charCodeAt(f)];a[c][1]=e.join("")}};diff_match_patch.prototype.diff_commonPrefix=function(a,b){if(!a||!b||a.charAt(0)!=b.charAt(0))return 0;for(var c=0,d=Math.min(a.length,b.length),e=d,f=0;c<e;){if(a.substring(f,e)==b.substring(f,e))f=c=e;else d=e;e=Math.floor((d-c)/2+c)}return e};
diff_match_patch.prototype.diff_commonSuffix=function(a,b){if(!a||!b||a.charAt(a.length-1)!=b.charAt(b.length-1))return 0;for(var c=0,d=Math.min(a.length,b.length),e=d,f=0;c<e;){if(a.substring(a.length-e,a.length-f)==b.substring(b.length-e,b.length-f))f=c=e;else d=e;e=Math.floor((d-c)/2+c)}return e};
diff_match_patch.prototype.diff_commonOverlap=function(a,b){var c=a.length,d=b.length;if(c==0||d==0)return 0;if(c>d)a=a.substring(c-d);else if(c<d)b=b.substring(0,c);c=Math.min(c,d);if(a==b)return c;d=0;for(var e=1;;){var f=a.substring(c-e);f=b.indexOf(f);if(f==-1)return d;e+=f;if(f==0||a.substring(c-e)==b.substring(0,e)){d=e;e++}}};
diff_match_patch.prototype.diff_halfMatch=function(a,b){function c(i,k,l){for(var n=i.substring(l,l+Math.floor(i.length/4)),o=-1,m="",p,q,s,r;(o=k.indexOf(n,o+1))!=-1;){var t=f.diff_commonPrefix(i.substring(l),k.substring(o)),u=f.diff_commonSuffix(i.substring(0,l),k.substring(0,o));if(m.length<u+t){m=k.substring(o-u,o)+k.substring(o,o+t);p=i.substring(0,l-u);q=i.substring(l+t);s=k.substring(0,o-u);r=k.substring(o+t)}}return m.length*2>=i.length?[p,q,s,r,m]:null}if(this.Diff_Timeout<=0)return null;
var d=a.length>b.length?a:b,e=a.length>b.length?b:a;if(d.length<4||e.length*2<d.length)return null;var f=this,h=c(d,e,Math.ceil(d.length/4));d=c(d,e,Math.ceil(d.length/2));var g;if(!h&&!d)return null;else g=d?h?h[4].length>d[4].length?h:d:d:h;var j;if(a.length>b.length){h=g[0];d=g[1];e=g[2];j=g[3]}else{e=g[0];j=g[1];h=g[2];d=g[3]}g=g[4];return[h,d,e,j,g]};
diff_match_patch.prototype.diff_cleanupSemantic=function(a){for(var b=false,c=[],d=0,e=null,f=0,h=0,g=0,j=0,i=0;f<a.length;){if(a[f][0]==0){c[d++]=f;h=j;g=i;i=j=0;e=a[f][1]}else{if(a[f][0]==1)j+=a[f][1].length;else i+=a[f][1].length;if(e!==null&&e.length<=Math.max(h,g)&&e.length<=Math.max(j,i)){a.splice(c[d-1],0,[-1,e]);a[c[d-1]+1][0]=1;d--;d--;f=d>0?c[d-1]:-1;i=j=g=h=0;e=null;b=true}}f++}b&&this.diff_cleanupMerge(a);this.diff_cleanupSemanticLossless(a);for(f=1;f<a.length;){if(a[f-1][0]==-1&&a[f][0]==
1){b=a[f-1][1];c=a[f][1];if(d=this.diff_commonOverlap(b,c)){a.splice(f,0,[0,c.substring(0,d)]);a[f-1][1]=b.substring(0,b.length-d);a[f+1][1]=c.substring(d);f++}f++}f++}};
diff_match_patch.prototype.diff_cleanupSemanticLossless=function(a){function b(q,s){if(!q||!s)return 5;var r=0;if(q.charAt(q.length-1).match(c)||s.charAt(0).match(c)){r++;if(q.charAt(q.length-1).match(d)||s.charAt(0).match(d)){r++;if(q.charAt(q.length-1).match(e)||s.charAt(0).match(e)){r++;if(q.match(f)||s.match(h))r++}}}return r}for(var c=/[^a-zA-Z0-9]/,d=/\s/,e=/[\r\n]/,f=/\n\r?\n$/,h=/^\r?\n\r?\n/,g=1;g<a.length-1;){if(a[g-1][0]==0&&a[g+1][0]==0){var j=a[g-1][1],i=a[g][1],k=a[g+1][1],l=this.diff_commonSuffix(j,
i);if(l){var n=i.substring(i.length-l);j=j.substring(0,j.length-l);i=n+i.substring(0,i.length-l);k=n+k}l=j;n=i;for(var o=k,m=b(j,i)+b(i,k);i.charAt(0)===k.charAt(0);){j+=i.charAt(0);i=i.substring(1)+k.charAt(0);k=k.substring(1);var p=b(j,i)+b(i,k);if(p>=m){m=p;l=j;n=i;o=k}}if(a[g-1][1]!=l){if(l)a[g-1][1]=l;else{a.splice(g-1,1);g--}a[g][1]=n;if(o)a[g+1][1]=o;else{a.splice(g+1,1);g--}}}g++}};
diff_match_patch.prototype.diff_cleanupEfficiency=function(a){for(var b=false,c=[],d=0,e="",f=0,h=false,g=false,j=false,i=false;f<a.length;){if(a[f][0]==0){if(a[f][1].length<this.Diff_EditCost&&(j||i)){c[d++]=f;h=j;g=i;e=a[f][1]}else{d=0;e=""}j=i=false}else{if(a[f][0]==-1)i=true;else j=true;if(e&&(h&&g&&j&&i||e.length<this.Diff_EditCost/2&&h+g+j+i==3)){a.splice(c[d-1],0,[-1,e]);a[c[d-1]+1][0]=1;d--;e="";if(h&&g){j=i=true;d=0}else{d--;f=d>0?c[d-1]:-1;j=i=false}b=true}}f++}b&&this.diff_cleanupMerge(a)};
diff_match_patch.prototype.diff_cleanupMerge=function(a){a.push([0,""]);for(var b=0,c=0,d=0,e="",f="",h;b<a.length;)switch(a[b][0]){case 1:d++;f+=a[b][1];b++;break;case -1:c++;e+=a[b][1];b++;break;case 0:if(c+d>1){if(c!==0&&d!==0){h=this.diff_commonPrefix(f,e);if(h!==0){if(b-c-d>0&&a[b-c-d-1][0]==0)a[b-c-d-1][1]+=f.substring(0,h);else{a.splice(0,0,[0,f.substring(0,h)]);b++}f=f.substring(h);e=e.substring(h)}h=this.diff_commonSuffix(f,e);if(h!==0){a[b][1]=f.substring(f.length-h)+a[b][1];f=f.substring(0,
f.length-h);e=e.substring(0,e.length-h)}}if(c===0)a.splice(b-c-d,c+d,[1,f]);else d===0?a.splice(b-c-d,c+d,[-1,e]):a.splice(b-c-d,c+d,[-1,e],[1,f]);b=b-c-d+(c?1:0)+(d?1:0)+1}else if(b!==0&&a[b-1][0]==0){a[b-1][1]+=a[b][1];a.splice(b,1)}else b++;c=d=0;f=e=""}a[a.length-1][1]===""&&a.pop();c=false;for(b=1;b<a.length-1;){if(a[b-1][0]==0&&a[b+1][0]==0)if(a[b][1].substring(a[b][1].length-a[b-1][1].length)==a[b-1][1]){a[b][1]=a[b-1][1]+a[b][1].substring(0,a[b][1].length-a[b-1][1].length);a[b+1][1]=a[b-1][1]+
a[b+1][1];a.splice(b-1,1);c=true}else if(a[b][1].substring(0,a[b+1][1].length)==a[b+1][1]){a[b-1][1]+=a[b+1][1];a[b][1]=a[b][1].substring(a[b+1][1].length)+a[b+1][1];a.splice(b+1,1);c=true}b++}c&&this.diff_cleanupMerge(a)};diff_match_patch.prototype.diff_xIndex=function(a,b){var c=0,d=0,e=0,f=0,h;for(h=0;h<a.length;h++){if(a[h][0]!==1)c+=a[h][1].length;if(a[h][0]!==-1)d+=a[h][1].length;if(c>b)break;e=c;f=d}if(a.length!=h&&a[h][0]===-1)return f;return f+(b-e)};
diff_match_patch.prototype.diff_prettyHtml=function(a){for(var b=[],c=0,d=/&/g,e=/</g,f=/>/g,h=/\n/g,g=0;g<a.length;g++){var j=a[g][0],i=a[g][1],k=i.replace(d,"&amp;").replace(e,"&lt;").replace(f,"&gt;").replace(h,"&para;<br>");switch(j){case 1:b[g]='<ins style="background:#e6ffe6;">'+k+"</ins>";break;case -1:b[g]='<del style="background:#ffe6e6;">'+k+"</del>";break;case 0:b[g]="<span>"+k+"</span>"}if(j!==-1)c+=i.length}return b.join("")};
diff_match_patch.prototype.diff_text1=function(a){for(var b=[],c=0;c<a.length;c++)if(a[c][0]!==1)b[c]=a[c][1];return b.join("")};diff_match_patch.prototype.diff_text2=function(a){for(var b=[],c=0;c<a.length;c++)if(a[c][0]!==-1)b[c]=a[c][1];return b.join("")};diff_match_patch.prototype.diff_levenshtein=function(a){for(var b=0,c=0,d=0,e=0;e<a.length;e++){var f=a[e][0],h=a[e][1];switch(f){case 1:c+=h.length;break;case -1:d+=h.length;break;case 0:b+=Math.max(c,d);d=c=0}}b+=Math.max(c,d);return b};
diff_match_patch.prototype.diff_toDelta=function(a){for(var b=[],c=0;c<a.length;c++)switch(a[c][0]){case 1:b[c]="+"+encodeURI(a[c][1]);break;case -1:b[c]="-"+a[c][1].length;break;case 0:b[c]="="+a[c][1].length}return b.join("\t").replace(/%20/g," ")};
diff_match_patch.prototype.diff_fromDelta=function(a,b){for(var c=[],d=0,e=0,f=b.split(/\t/g),h=0;h<f.length;h++){var g=f[h].substring(1);switch(f[h].charAt(0)){case "+":try{c[d++]=[1,decodeURI(g)]}catch(j){throw Error("Illegal escape in diff_fromDelta: "+g);}break;case "-":case "=":var i=parseInt(g,10);if(isNaN(i)||i<0)throw Error("Invalid number in diff_fromDelta: "+g);g=a.substring(e,e+=i);if(f[h].charAt(0)=="=")c[d++]=[0,g];else c[d++]=[-1,g];break;default:if(f[h])throw Error("Invalid diff operation in diff_fromDelta: "+
f[h]);}}if(e!=a.length)throw Error("Delta length ("+e+") does not equal source text length ("+a.length+").");return c};diff_match_patch.prototype.match_main=function(a,b,c){if(a==null||b==null||c==null)throw Error("Null input. (match_main)");c=Math.max(0,Math.min(c,a.length));return a==b?0:a.length?a.substring(c,c+b.length)==b?c:this.match_bitap(a,b,c):-1};
diff_match_patch.prototype.match_bitap=function(a,b,c){function d(q,s){var r=q/b.length,t=Math.abs(c-s);if(!f.Match_Distance)return t?1:r;return r+t/f.Match_Distance}if(b.length>this.Match_MaxBits)throw Error("Pattern too long for this browser.");var e=this.match_alphabet(b),f=this,h=this.Match_Threshold,g=a.indexOf(b,c);if(g!=-1){h=Math.min(d(0,g),h);g=a.lastIndexOf(b,c+b.length);if(g!=-1)h=Math.min(d(0,g),h)}var j=1<<b.length-1;g=-1;for(var i,k,l=b.length+a.length,n,o=0;o<b.length;o++){i=0;for(k=
l;i<k;){if(d(o,c+k)<=h)i=k;else l=k;k=Math.floor((l-i)/2+i)}l=k;i=Math.max(1,c-k+1);var m=Math.min(c+k,a.length)+b.length;k=Array(m+2);k[m+1]=(1<<o)-1;for(m=m;m>=i;m--){var p=e[a.charAt(m-1)];k[m]=o===0?(k[m+1]<<1|1)&p:(k[m+1]<<1|1)&p|(n[m+1]|n[m])<<1|1|n[m+1];if(k[m]&j){p=d(o,m-1);if(p<=h){h=p;g=m-1;if(g>c)i=Math.max(1,2*c-g);else break}}}if(d(o+1,c)>h)break;n=k}return g};
diff_match_patch.prototype.match_alphabet=function(a){for(var b={},c=0;c<a.length;c++)b[a.charAt(c)]=0;for(c=0;c<a.length;c++)b[a.charAt(c)]|=1<<a.length-c-1;return b};
diff_match_patch.prototype.patch_addContext=function(a,b){if(b.length!=0){for(var c=b.substring(a.start2,a.start2+a.length1),d=0;b.indexOf(c)!=b.lastIndexOf(c)&&c.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;){d+=this.Patch_Margin;c=b.substring(a.start2-d,a.start2+a.length1+d)}d+=this.Patch_Margin;(c=b.substring(a.start2-d,a.start2))&&a.diffs.unshift([0,c]);(d=b.substring(a.start2+a.length1,a.start2+a.length1+d))&&a.diffs.push([0,d]);a.start1-=c.length;a.start2-=c.length;a.length1+=
c.length+d.length;a.length2+=c.length+d.length}};
diff_match_patch.prototype.patch_make=function(a,b,c){var d;if(typeof a=="string"&&typeof b=="string"&&typeof c=="undefined"){d=a;b=this.diff_main(d,b,true);if(b.length>2){this.diff_cleanupSemantic(b);this.diff_cleanupEfficiency(b)}}else if(a&&typeof a=="object"&&typeof b=="undefined"&&typeof c=="undefined"){b=a;d=this.diff_text1(b)}else if(typeof a=="string"&&b&&typeof b=="object"&&typeof c=="undefined"){d=a;b=b}else if(typeof a=="string"&&typeof b=="string"&&c&&typeof c=="object"){d=a;b=c}else throw Error("Unknown call format to patch_make.");
if(b.length===0)return[];c=[];a=new patch_obj;var e=0,f=0,h=0,g=d;d=d;for(var j=0;j<b.length;j++){var i=b[j][0],k=b[j][1];if(!e&&i!==0){a.start1=f;a.start2=h}switch(i){case 1:a.diffs[e++]=b[j];a.length2+=k.length;d=d.substring(0,h)+k+d.substring(h);break;case -1:a.length1+=k.length;a.diffs[e++]=b[j];d=d.substring(0,h)+d.substring(h+k.length);break;case 0:if(k.length<=2*this.Patch_Margin&&e&&b.length!=j+1){a.diffs[e++]=b[j];a.length1+=k.length;a.length2+=k.length}else if(k.length>=2*this.Patch_Margin)if(e){this.patch_addContext(a,
g);c.push(a);a=new patch_obj;e=0;g=d;f=h}}if(i!==1)f+=k.length;if(i!==-1)h+=k.length}if(e){this.patch_addContext(a,g);c.push(a)}return c};diff_match_patch.prototype.patch_deepCopy=function(a){for(var b=[],c=0;c<a.length;c++){var d=a[c],e=new patch_obj;e.diffs=[];for(var f=0;f<d.diffs.length;f++)e.diffs[f]=d.diffs[f].slice();e.start1=d.start1;e.start2=d.start2;e.length1=d.length1;e.length2=d.length2;b[c]=e}return b};
diff_match_patch.prototype.patch_apply=function(a,b){if(a.length==0)return[b,[]];a=this.patch_deepCopy(a);var c=this.patch_addPadding(a);b=c+b+c;this.patch_splitMax(a);for(var d=0,e=[],f=0;f<a.length;f++){var h=a[f].start2+d,g=this.diff_text1(a[f].diffs),j,i=-1;if(g.length>this.Match_MaxBits){j=this.match_main(b,g.substring(0,this.Match_MaxBits),h);if(j!=-1){i=this.match_main(b,g.substring(g.length-this.Match_MaxBits),h+g.length-this.Match_MaxBits);if(i==-1||j>=i)j=-1}}else j=this.match_main(b,g,
h);if(j==-1){e[f]=false;d-=a[f].length2-a[f].length1}else{e[f]=true;d=j-h;h=i==-1?b.substring(j,j+g.length):b.substring(j,i+this.Match_MaxBits);if(g==h)b=b.substring(0,j)+this.diff_text2(a[f].diffs)+b.substring(j+g.length);else{h=this.diff_main(g,h,false);if(g.length>this.Match_MaxBits&&this.diff_levenshtein(h)/g.length>this.Patch_DeleteThreshold)e[f]=false;else{this.diff_cleanupSemanticLossless(h);g=0;var k;for(i=0;i<a[f].diffs.length;i++){var l=a[f].diffs[i];if(l[0]!==0)k=this.diff_xIndex(h,g);
if(l[0]===1)b=b.substring(0,j+k)+l[1]+b.substring(j+k);else if(l[0]===-1)b=b.substring(0,j+k)+b.substring(j+this.diff_xIndex(h,g+l[1].length));if(l[0]!==-1)g+=l[1].length}}}}}b=b.substring(c.length,b.length-c.length);return[b,e]};
diff_match_patch.prototype.patch_addPadding=function(a){for(var b=this.Patch_Margin,c="",d=1;d<=b;d++)c+=String.fromCharCode(d);for(d=0;d<a.length;d++){a[d].start1+=b;a[d].start2+=b}d=a[0];var e=d.diffs;if(e.length==0||e[0][0]!=0){e.unshift([0,c]);d.start1-=b;d.start2-=b;d.length1+=b;d.length2+=b}else if(b>e[0][1].length){var f=b-e[0][1].length;e[0][1]=c.substring(e[0][1].length)+e[0][1];d.start1-=f;d.start2-=f;d.length1+=f;d.length2+=f}d=a[a.length-1];e=d.diffs;if(e.length==0||e[e.length-1][0]!=
0){e.push([0,c]);d.length1+=b;d.length2+=b}else if(b>e[e.length-1][1].length){f=b-e[e.length-1][1].length;e[e.length-1][1]+=c.substring(0,f);d.length1+=f;d.length2+=f}return c};
diff_match_patch.prototype.patch_splitMax=function(a){for(var b=this.Match_MaxBits,c=0;c<a.length;c++)if(a[c].length1>b){var d=a[c];a.splice(c--,1);for(var e=d.start1,f=d.start2,h="";d.diffs.length!==0;){var g=new patch_obj,j=true;g.start1=e-h.length;g.start2=f-h.length;if(h!==""){g.length1=g.length2=h.length;g.diffs.push([0,h])}for(;d.diffs.length!==0&&g.length1<b-this.Patch_Margin;){h=d.diffs[0][0];var i=d.diffs[0][1];if(h===1){g.length2+=i.length;f+=i.length;g.diffs.push(d.diffs.shift());j=false}else if(h===
-1&&g.diffs.length==1&&g.diffs[0][0]==0&&i.length>2*b){g.length1+=i.length;e+=i.length;j=false;g.diffs.push([h,i]);d.diffs.shift()}else{i=i.substring(0,b-g.length1-this.Patch_Margin);g.length1+=i.length;e+=i.length;if(h===0){g.length2+=i.length;f+=i.length}else j=false;g.diffs.push([h,i]);if(i==d.diffs[0][1])d.diffs.shift();else d.diffs[0][1]=d.diffs[0][1].substring(i.length)}}h=this.diff_text2(g.diffs);h=h.substring(h.length-this.Patch_Margin);i=this.diff_text1(d.diffs).substring(0,this.Patch_Margin);
if(i!==""){g.length1+=i.length;g.length2+=i.length;if(g.diffs.length!==0&&g.diffs[g.diffs.length-1][0]===0)g.diffs[g.diffs.length-1][1]+=i;else g.diffs.push([0,i])}j||a.splice(++c,0,g)}}};diff_match_patch.prototype.patch_toText=function(a){for(var b=[],c=0;c<a.length;c++)b[c]=a[c];return b.join("")};
diff_match_patch.prototype.patch_fromText=function(a){var b=[];if(!a)return b;a=a.split("\n");for(var c=0,d=/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;c<a.length;){var e=a[c].match(d);if(!e)throw Error("Invalid patch string: "+a[c]);var f=new patch_obj;b.push(f);f.start1=parseInt(e[1],10);if(e[2]===""){f.start1--;f.length1=1}else if(e[2]=="0")f.length1=0;else{f.start1--;f.length1=parseInt(e[2],10)}f.start2=parseInt(e[3],10);if(e[4]===""){f.start2--;f.length2=1}else if(e[4]=="0")f.length2=0;else{f.start2--;
f.length2=parseInt(e[4],10)}for(c++;c<a.length;){e=a[c].charAt(0);try{var h=decodeURI(a[c].substring(1))}catch(g){throw Error("Illegal escape in patch_fromText: "+h);}if(e=="-")f.diffs.push([-1,h]);else if(e=="+")f.diffs.push([1,h]);else if(e==" ")f.diffs.push([0,h]);else if(e=="@")break;else if(e!=="")throw Error('Invalid patch mode "'+e+'" in: '+h);c++}}return b};function patch_obj(){this.diffs=[];this.start2=this.start1=null;this.length2=this.length1=0}
patch_obj.prototype.toString=function(){var a,b;a=this.length1===0?this.start1+",0":this.length1==1?this.start1+1:this.start1+1+","+this.length1;b=this.length2===0?this.start2+",0":this.length2==1?this.start2+1:this.start2+1+","+this.length2;a=["@@ -"+a+" +"+b+" @@\n"];var c;for(b=0;b<this.diffs.length;b++){switch(this.diffs[b][0]){case 1:c="+";break;case -1:c="-";break;case 0:c=" "}a[b+1]=c+encodeURI(this.diffs[b][1])+"\n"}return a.join("").replace(/%20/g," ")};window.diff_match_patch=diff_match_patch;
window.patch_obj=patch_obj;window.DIFF_DELETE=-1;window.DIFF_INSERT=1;window.DIFF_EQUAL=0;})()
