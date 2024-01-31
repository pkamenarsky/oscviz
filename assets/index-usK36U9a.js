var W=Object.defineProperty;var K=(n,e,o)=>e in n?W(n,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):n[e]=o;var T=(n,e,o)=>(K(n,typeof e!="symbol"?e+"":e,o),o);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const c of i.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&t(c)}).observe(document,{childList:!0,subtree:!0});function o(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(r){if(r.ep)return;r.ep=!0;const i=o(r);fetch(r.href,i)}})();var J=`#ifndef FNC_MOD289
#define FNC_MOD289

float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

#endif
#ifndef FNC_MOD289
#define FNC_MOD289

float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

#endif

#ifndef FNC_PERMUTE
#define FNC_PERMUTE

float permute(const in float x) { return mod289(((x * 34.0) + 1.0) * x); }
vec2 permute(const in vec2 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec3 permute(const in vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 permute(const in vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

#endif
#ifndef FNC_TAYLORINVSQRT
#define FNC_TAYLORINVSQRT
float taylorInvSqrt(in float r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 taylorInvSqrt(in vec2 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 taylorInvSqrt(in vec3 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
#endif
#ifndef FNC_GRAD4
#define FNC_GRAD4
vec4 grad4(float j, vec4 ip) {
    const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
    vec4 p,s;

    p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
    p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
    s = vec4(lessThan(p, vec4(0.0)));
    p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;

    return p;
}
#endif

#ifndef FNC_SNOISE
#define FNC_SNOISE
float snoise(in vec2 v) {
    const vec4 C = vec4(0.211324865405187,  
                        0.366025403784439,  
                        -0.577350269189626,  
                        0.024390243902439); 
    
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);

    
    vec2 i1;
    
    
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    
    
    
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;

    
    i = mod289(i); 
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;

    
    

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    
    
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

    
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

float snoise(in vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;

    
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );

    
    
    
    
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy; 
    vec3 x3 = x0 - D.yyy;      

    
    i = mod289(i);
    vec4 p = permute( permute( permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

    
    
    float n_ = 0.142857142857; 
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );    

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );

    
    
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);

    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

float snoise(in vec4 v) {
    const vec4  C = vec4( 0.138196601125011,  
                        0.276393202250021,  
                        0.414589803375032,  
                        -0.447213595499958); 

    
    vec4 i  = floor(v + dot(v, vec4(.309016994374947451)) ); 
    vec4 x0 = v -   i + dot(i, C.xxxx);

    

    
    vec4 i0;
    vec3 isX = step( x0.yzw, x0.xxx );
    vec3 isYZ = step( x0.zww, x0.yyz );
    
    i0.x = isX.x + isX.y + isX.z;
    i0.yzw = 1.0 - isX;
    
    i0.y += isYZ.x + isYZ.y;
    i0.zw += 1.0 - isYZ.xy;
    i0.z += isYZ.z;
    i0.w += 1.0 - isYZ.z;

    
    vec4 i3 = clamp( i0, 0.0, 1.0 );
    vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );
    vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );

    
    
    
    
    
    vec4 x1 = x0 - i1 + C.xxxx;
    vec4 x2 = x0 - i2 + C.yyyy;
    vec4 x3 = x0 - i3 + C.zzzz;
    vec4 x4 = x0 + C.wwww;

    
    i = mod289(i);
    float j0 = permute( permute( permute( permute(i.w) + i.z) + i.y) + i.x);
    vec4 j1 = permute( permute( permute( permute (
                i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))
            + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))
            + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))
            + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));

    
    
    vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;

    vec4 p0 = grad4(j0,   ip);
    vec4 p1 = grad4(j1.x, ip);
    vec4 p2 = grad4(j1.y, ip);
    vec4 p3 = grad4(j1.z, ip);
    vec4 p4 = grad4(j1.w, ip);

    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    p4 *= taylorInvSqrt(dot(p4,p4));

    
    vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);
    vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);
    m0 = m0 * m0;
    m1 = m1 * m1;
    return 49.0 * ( dot(m0*m0, vec3( dot( p0, x0 ), dot( p1, x1 ), dot( p2, x2 )))
                + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;
}

vec2 snoise2( vec2 x ){
    float s  = snoise(vec2( x ));
    float s1 = snoise(vec2( x.y - 19.1, x.x + 47.2 ));
    return vec2( s , s1 );
}

vec3 snoise3( vec3 x ){
    float s  = snoise(vec3( x ));
    float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));
    float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));
    return vec3( s , s1 , s2 );
}

vec3 snoise3( vec4 x ){
    float s  = snoise(vec4( x ));
    float s1 = snoise(vec4( x.y - 19.1 , x.z + 33.4 , x.x + 47.2, x.w ));
    float s2 = snoise(vec4( x.z + 74.2 , x.x - 124.5 , x.y + 99.4, x.w ));
    return vec3( s , s1 , s2 );
}

#endif
#ifndef FNC_MOD289
#define FNC_MOD289

float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

#endif
#ifndef FNC_MOD289
#define FNC_MOD289

float mod289(const in float x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(const in vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 mod289(const in vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec4 mod289(const in vec4 x) { return x - floor(x * (1. / 289.)) * 289.; }

#endif

#ifndef FNC_PERMUTE
#define FNC_PERMUTE

float permute(const in float x) { return mod289(((x * 34.0) + 1.0) * x); }
vec2 permute(const in vec2 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec3 permute(const in vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 permute(const in vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }

#endif
#ifndef FNC_TAYLORINVSQRT
#define FNC_TAYLORINVSQRT
float taylorInvSqrt(in float r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 taylorInvSqrt(in vec2 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec3 taylorInvSqrt(in vec3 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec4 taylorInvSqrt(in vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
#endif
#ifndef FNC_QUINTIC
#define FNC_QUINTIC 

float quintic(const in float v) { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec2  quintic(const in vec2 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec3  quintic(const in vec3 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }
vec4  quintic(const in vec4 v)  { return v*v*v*(v*(v*6.0-15.0)+10.0); }

#endif

#ifndef FNC_PNOISE
#define FNC_PNOISE

float pnoise(in vec2 P, in vec2 rep) {
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, rep.xyxy); 
    Pi = mod289(Pi);        
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;

    vec4 i = permute(permute(ix) + iy);

    vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;
    vec4 gy = abs(gx) - 0.5 ;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;

    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);

    vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;

    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));

    vec2 fade_xy = quintic(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

float pnoise(in vec3 P, in vec3 rep) {
    vec3 Pi0 = mod(floor(P), rep); 
    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); 
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec3 Pf0 = fract(P); 
    vec3 Pf1 = Pf0 - vec3(1.0); 
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 * (1.0 / 7.0);
    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 * (1.0 / 7.0);
    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = quintic(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
}

float pnoise(in vec4 P, in vec4 rep) {
    vec4 Pi0 = mod(floor(P), rep); 
    vec4 Pi1 = mod(Pi0 + 1.0, rep); 
    Pi0 = mod289(Pi0);
    Pi1 = mod289(Pi1);
    vec4 Pf0 = fract(P); 
    vec4 Pf1 = Pf0 - 1.0; 
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = vec4(Pi0.zzzz);
    vec4 iz1 = vec4(Pi1.zzzz);
    vec4 iw0 = vec4(Pi0.wwww);
    vec4 iw1 = vec4(Pi1.wwww);

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);
    vec4 ixy00 = permute(ixy0 + iw0);
    vec4 ixy01 = permute(ixy0 + iw1);
    vec4 ixy10 = permute(ixy1 + iw0);
    vec4 ixy11 = permute(ixy1 + iw1);

    vec4 gx00 = ixy00 * (1.0 / 7.0);
    vec4 gy00 = floor(gx00) * (1.0 / 7.0);
    vec4 gz00 = floor(gy00) * (1.0 / 6.0);
    gx00 = fract(gx00) - 0.5;
    gy00 = fract(gy00) - 0.5;
    gz00 = fract(gz00) - 0.5;
    vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);
    vec4 sw00 = step(gw00, vec4(0.0));
    gx00 -= sw00 * (step(0.0, gx00) - 0.5);
    gy00 -= sw00 * (step(0.0, gy00) - 0.5);

    vec4 gx01 = ixy01 * (1.0 / 7.0);
    vec4 gy01 = floor(gx01) * (1.0 / 7.0);
    vec4 gz01 = floor(gy01) * (1.0 / 6.0);
    gx01 = fract(gx01) - 0.5;
    gy01 = fract(gy01) - 0.5;
    gz01 = fract(gz01) - 0.5;
    vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);
    vec4 sw01 = step(gw01, vec4(0.0));
    gx01 -= sw01 * (step(0.0, gx01) - 0.5);
    gy01 -= sw01 * (step(0.0, gy01) - 0.5);

    vec4 gx10 = ixy10 * (1.0 / 7.0);
    vec4 gy10 = floor(gx10) * (1.0 / 7.0);
    vec4 gz10 = floor(gy10) * (1.0 / 6.0);
    gx10 = fract(gx10) - 0.5;
    gy10 = fract(gy10) - 0.5;
    gz10 = fract(gz10) - 0.5;
    vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);
    vec4 sw10 = step(gw10, vec4(0.0));
    gx10 -= sw10 * (step(0.0, gx10) - 0.5);
    gy10 -= sw10 * (step(0.0, gy10) - 0.5);

    vec4 gx11 = ixy11 * (1.0 / 7.0);
    vec4 gy11 = floor(gx11) * (1.0 / 7.0);
    vec4 gz11 = floor(gy11) * (1.0 / 6.0);
    gx11 = fract(gx11) - 0.5;
    gy11 = fract(gy11) - 0.5;
    gz11 = fract(gz11) - 0.5;
    vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);
    vec4 sw11 = step(gw11, vec4(0.0));
    gx11 -= sw11 * (step(0.0, gx11) - 0.5);
    gy11 -= sw11 * (step(0.0, gy11) - 0.5);

    vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);
    vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);
    vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);
    vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);
    vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);
    vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);
    vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);
    vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);
    vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);
    vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);
    vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);
    vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);
    vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);
    vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);
    vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);
    vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);

    vec4 norm00 = taylorInvSqrt(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));
    g0000 *= norm00.x;
    g0100 *= norm00.y;
    g1000 *= norm00.z;
    g1100 *= norm00.w;

    vec4 norm01 = taylorInvSqrt(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));
    g0001 *= norm01.x;
    g0101 *= norm01.y;
    g1001 *= norm01.z;
    g1101 *= norm01.w;

    vec4 norm10 = taylorInvSqrt(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));
    g0010 *= norm10.x;
    g0110 *= norm10.y;
    g1010 *= norm10.z;
    g1110 *= norm10.w;

    vec4 norm11 = taylorInvSqrt(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));
    g0011 *= norm11.x;
    g0111 *= norm11.y;
    g1011 *= norm11.z;
    g1111 *= norm11.w;

    float n0000 = dot(g0000, Pf0);
    float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));
    float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));
    float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));
    float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));
    float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));
    float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));
    float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));
    float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));
    float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));
    float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));
    float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));
    float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));
    float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));
    float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));
    float n1111 = dot(g1111, Pf1);

    vec4 fade_xyzw = quintic(Pf0);
    vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);
    vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);
    vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);
    vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);
    float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);
    return 2.2 * n_xyzw;
}
#endif
#ifndef FNC_RGB2LUMA
#define FNC_RGB2LUMA
float rgb2luma(in vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
}

float rgb2luma(in vec4 color) {
    return rgb2luma(color.rgb);
}
#endif

#ifndef FNC_LUMA
#define FNC_LUMA
float luma(float color) {
    return color;
}

float luma(in vec3 color) {
    return rgb2luma(color);
}

float luma(in vec4 color) {
    return rgb2luma(color.rgb);
}
#endif
#ifndef FNC_BLENDSOFTLIGHT
#define FNC_BLENDSOFTLIGHT
float blendSoftLight(in float base, in float blend) {
    return (blend < .5)? (2. * base * blend + base * base * (1. - 2.*blend)): (sqrt(base) * (2. * blend - 1.) + 2. * base * (1. - blend));
}

vec3 blendSoftLight(in vec3 base, in vec3 blend) {
    return vec3(blendSoftLight(base.r, blend.r),
                blendSoftLight(base.g, blend.g),
                blendSoftLight(base.b, blend.b));
}

vec4 blendSoftLight(in vec4 base, in vec4 blend) {
    return vec4(blendSoftLight( base.r, blend.r ),
                blendSoftLight( base.g, blend.g ),
                blendSoftLight( base.b, blend.b ),
                blendSoftLight( base.a, blend.a )
    );
}

vec3 blendSoftLight(in vec3 base, in vec3 blend, in float opacity) {
    return (blendSoftLight(base, blend) * opacity + base * (1. - opacity));
}
#endif
#ifndef SAMPLER_FNC
#if __VERSION__ >= 300
#define SAMPLER_FNC(TEX, UV) texture(TEX, UV)
#else
#define SAMPLER_FNC(TEX, UV) texture2D(TEX, UV)
#endif
#endif

#ifndef GRAIN_TYPE
#define GRAIN_TYPE vec3
#endif

#ifndef GRAIN_SAMPLER_FNC
#define GRAIN_SAMPLER_FNC(TEX, UV) SAMPLER_FNC(TEX, UV).rgb
#endif

#ifndef FNC_GRAIN
#define FNC_GRAIN
float grain(vec2 texCoord, vec2 resolution, float t, float multiplier) {
    vec2 mult = texCoord * resolution;
    float offset = snoise(vec3(mult / multiplier, t));
    float n1 = pnoise(vec3(mult, offset), vec3(1. / texCoord * resolution, 1.));
    return n1 / 2. + .5;
}

float grain(vec2 texCoord, vec2 resolution, float t) {
    return grain(texCoord, resolution, t, 2.5);
}

float grain(vec2 texCoord, vec2 resolution) {
    return grain(texCoord, resolution, 0.);
}

GRAIN_TYPE grain(sampler2D tex, vec2 st, vec2 resolution, float t, float multiplier ) {
    GRAIN_TYPE org = GRAIN_SAMPLER_FNC(tex, st);

    float g = grain(st, resolution, t, multiplier);

    
    float luminance = luma(org);
    
    
    
    float response = smoothstep(0.05, 0.5, luminance);
    return mix( blendSoftLight(org, GRAIN_TYPE(g)), 
                org, 
                response * response);
}

GRAIN_TYPE grain(sampler2D tex, vec2 st, vec2 resolution, float t ) {
    return grain(tex, st, resolution, t, 2.5 );
}

GRAIN_TYPE grain(sampler2D tex, vec2 st, vec2 resolution) {
    return grain(tex, st, resolution, 0.);
}

GRAIN_TYPE grain(sampler2D tex, vec2 st, float resolution, float t, float multiplier  ) {
    return grain(tex, st, vec2(resolution), t, multiplier );
}

GRAIN_TYPE grain(sampler2D tex, vec2 st, float resolution, float t ) {
    return grain(tex, st, resolution, t, 2.5 );
}

GRAIN_TYPE grain(sampler2D tex, vec2 st, float resolution) {
    return grain(tex, st, resolution, 0.);
}

#endif`,nn=`#ifndef FNC_LENGTHSQ
#define FNC_LENGTHSQ

float lengthSq(in vec2 v) { return dot(v, v); }
float lengthSq(in vec3 v) { return dot(v, v); }
float lengthSq(in vec4 v) { return dot(v, v); }

#endif
#ifndef SAMPLER_FNC
#if __VERSION__ >= 300
#define SAMPLER_FNC(TEX, UV) texture(TEX, UV)
#else
#define SAMPLER_FNC(TEX, UV) texture2D(TEX, UV)
#endif
#endif

#ifndef CHROMAAB_PCT
#define CHROMAAB_PCT 1.5
#endif

#ifndef CHROMAAB_TYPE
#define CHROMAAB_TYPE vec3
#endif

#ifndef CHROMAAB_SAMPLER_FNC
#define CHROMAAB_SAMPLER_FNC(TEX, UV) SAMPLER_FNC(TEX, UV)
#endif

#ifndef FNC_CHROMAAB
#define FNC_CHROMAAB

CHROMAAB_TYPE chromaAB(in sampler2D tex, in vec2 st, in vec2 direction, in vec3 distortion ) {
    vec2 offset = vec2(0.0);
    CHROMAAB_TYPE c = CHROMAAB_TYPE(1.);
    c.r = CHROMAAB_SAMPLER_FNC(tex, st + direction * distortion.r).r;
    c.g = CHROMAAB_SAMPLER_FNC(tex, st + direction * distortion.g).g;
    c.b = CHROMAAB_SAMPLER_FNC(tex, st + direction * distortion.b).b;
    return c;
}

CHROMAAB_TYPE chromaAB(in sampler2D tex, in vec2 st, in vec2 offset, in float pct) {

  #ifdef CHROMAAB_CENTER_BUFFER
    
    offset = max(offset - CHROMAAB_CENTER_BUFFER, 0.);
  #endif

  
  vec2 stR = st * (1.0 + offset * 0.02 * pct),
       stB = st * (1.0 - offset * 0.02 * pct);

  
  CHROMAAB_TYPE c = CHROMAAB_TYPE(1.);
  c.r = CHROMAAB_SAMPLER_FNC(tex, stR).r;
  c.g = CHROMAAB_SAMPLER_FNC(tex, st).g;
  c.b = CHROMAAB_SAMPLER_FNC(tex, stB).b;
  return c;
}

CHROMAAB_TYPE chromaAB(in sampler2D tex, in vec2 st, in float sdf, in float pct) {
  return chromaAB(tex, st, vec2(sdf), pct);
}

CHROMAAB_TYPE chromaAB(in sampler2D tex, in vec2 st, in float sdf) {
  return chromaAB(tex, st, sdf, CHROMAAB_PCT);
}

CHROMAAB_TYPE chromaAB(in sampler2D tex, in vec2 st, in vec2 offset) {
  return chromaAB(tex, st, offset, CHROMAAB_PCT);
}

CHROMAAB_TYPE chromaAB(in sampler2D tex, in vec2 st) {
  return chromaAB(tex, st, lengthSq(st - .5), CHROMAAB_PCT);
}

#endif`;function h(n){return new class extends en{value(e){return n(e)}}}class en{constructor(){T(this,"map",e=>h(o=>e(this.value(o))));T(this,"ap",e=>h(o=>e.value(o)(this.value(o))));T(this,"zip",e=>e.ap(this.map(o=>t=>[o,t])))}}function g(n){return h(e=>n)}function $(n,e){let o=-1,t,r=n;return h(i=>(o<i&&(o=i,[t,r]=e(r)),t))}function I(n,e){const o=e();function t(){o.next().then(r=>{r.done||(n=r.value,t())})}return t(),h(r=>n.value(r))}async function P(n){return new Promise(e=>setTimeout(e,n))}const tn=Date.now(),F=$(0,n=>[(Date.now()-tn)/1e3,0]);function b(n,e,o){function c(s){return s=(1664525*s+1)%4294967296,[s/4294967296,s]}function f(s,m,v){const w=v*Math.PI,p=(1-Math.cos(w))*.5;return s*(1-p)+m*p}let d,u;[d,n]=c(n),[u,n]=c(n);function y([s,m]){let v;return m%o===0?(d=u,[u,s]=c(s),v=d*e):v=f(d,u,m%o/o)*e,[v,[s,m+1]]}return $([n,0],y)}const O={width:1024,height:1024,format:"byte",clampMode:"edge"},on=34836;function rn(){const e=document.getElementById("canvas").getContext("webgl2",{premultipliedAlpha:!1,alpha:!0});if(e==null)throw"gl";const o=e.getExtension("EXT_color_buffer_float");console.log(o);const t=e.getExtension("OES_texture_float_linear");console.log(t),e.getExtension("EXT_float_blend");const r=new Float32Array([-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]),i=new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),c=e.createBuffer(),f=e.createBuffer();if(c==null||f==null)throw"vertBuf | uvBuf";return e.bindBuffer(e.ARRAY_BUFFER,c),e.bufferData(e.ARRAY_BUFFER,r,e.STATIC_DRAW),e.bindBuffer(e.ARRAY_BUFFER,f),e.bufferData(e.ARRAY_BUFFER,i,e.STATIC_DRAW),{gl:e,rectVertBuf:c,rectUvBuf:f}}function U(n,e){const o=n.gl;o.enableVertexAttribArray(e.a_position),o.bindBuffer(o.ARRAY_BUFFER,n.rectVertBuf),o.vertexAttribPointer(e.a_position,3,o.FLOAT,!1,0,0),e.a_uv&&(o.enableVertexAttribArray(e.a_uv),o.bindBuffer(o.ARRAY_BUFFER,n.rectUvBuf),o.vertexAttribPointer(e.a_uv,2,o.FLOAT,!1,0,0)),o.drawArrays(o.TRIANGLES,0,6)}function H(n,e){const o=n.createFramebuffer();if(o==null)throw"fb";const t=n.createTexture(),r=e.clampMode||"edge";if(t==null)throw"texture";return n.bindTexture(n.TEXTURE_2D,t),e.format=="byte"?n.texImage2D(n.TEXTURE_2D,0,n.RGBA,e.width,e.height,0,n.RGBA,n.UNSIGNED_BYTE,null):e.format=="float"&&n.texImage2D(n.TEXTURE_2D,0,on,e.width,e.height,0,n.RGBA,n.FLOAT,null),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,r=="edge"?n.CLAMP_TO_EDGE:n.REPEAT),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,r=="edge"?n.CLAMP_TO_EDGE:n.REPEAT),n.bindFramebuffer(n.FRAMEBUFFER,o),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,t,0),[{texture:t},()=>{n.bindFramebuffer(n.FRAMEBUFFER,o),n.viewport(0,0,e.width,e.height)}]}function X(n){let e=-1;function o(t){t<=e||(e=t,n(t))}return o}function cn(n){return null}function G(n,e,o,t,r){switch(e){case"int":return n.uniform1i(o,t),r;case"float":return n.uniform1f(o,t),r;case"vec2":return n.uniform2f(o,t.x,t.y),r;case"vec3":return n.uniform3f(o,t.x,t.y,t.z),r;case"vec4":return n.uniform4f(o,t.x,t.y,t.z,t.w),r;case"color":return n.uniform4f(o,t.r,t.g,t.b,t.a),r;case"texture":return n.activeTexture(n.TEXTURE0+r),n.bindTexture(n.TEXTURE_2D,t.texture),n.uniform1i(o,r),r+1;default:return cn()}}function V(n,e,o){const t=n.createShader(n.VERTEX_SHADER),r=n.createShader(n.FRAGMENT_SHADER);if(t==null)throw"vertShader";if(r==null)throw"fragShader";if(n.shaderSource(t,e),n.compileShader(t),n.shaderSource(r,o),n.compileShader(r),!n.getShaderParameter(t,n.COMPILE_STATUS))throw`Vert error: ${n.getShaderInfoLog(t)}`;if(!n.getShaderParameter(r,n.COMPILE_STATUS))throw`Frag error: ${n.getShaderInfoLog(r)}`;const i=n.createProgram();if(i==null)throw"program";if(n.attachShader(i,t),n.attachShader(i,r),n.linkProgram(i),!n.getProgramParameter(i,n.LINK_STATUS))throw`Could not compile WebGL program. 

${n.getProgramInfoLog(i)}`;return i}function j(n,e,o){const t=V(n,o.vert,o.frag),r=n.getAttribLocation(t,"a_position"),i=o.uv?n.getAttribLocation(t,"a_uv"):null,c={};for(let d of Object.keys(e))c[d]=n.getUniformLocation(t,"u_"+d);function f(d){n.useProgram(t);let u=0;for(let[y,s]of Object.entries(e))u=G(n,s,c[y],d[y],u);return{a_position:r,a_uv:i}}return f}function k(n,e){const o=Object.fromEntries(Object.entries(n).map(([t,r])=>[t,e[t]||g(r[1])]));return[t=>Object.fromEntries(Object.entries(o).map(([r,i])=>[r,i.value(t)])),Object.fromEntries(Object.entries(n).map(([t,r])=>[t,r[0]]))]}function Q(n,e,o,t){function r(i,c,f){const{vert:d,frag:u}=t({...O,...e,...c}),[y,s]=k(n,f),m=j(i.gl,{...s,tex:"texture"},{uv:o,vert:d,frag:u}),[v,w]=H(i.gl,{...O,...c}),p=X(z=>{c.tex.render(z),w(),U(i,m({...y(z),tex:c.tex.out}))});return{out:v,render:p}}return{op:r,sha:""}}function an(n,e,o,t,r){const i=n.gl,c=j(i,{offset:"vec2",scale:"float",texture:"texture"},{uv:!0,vert:`
attribute vec4 a_position;
attribute vec2 a_uv;

uniform vec2 u_offset;
uniform float u_scale;

varying vec2 uv;

void main() {
  uv = a_uv;
  gl_Position = vec4(((a_position.xy + 1.) / 2. * u_scale + u_offset) * 2. - 1., a_position.z, a_position.w);
}`,frag:`
precision highp float;

varying vec2 uv;
uniform sampler2D u_texture;

void main() {
  gl_FragColor = texture2D(u_texture, uv);
}`});function f(){U(n,c({texture:e,offset:{x:o,y:t},scale:r}))}return{render:f}}const fn=Q({t:["float",0],multiplier:["float",2.5]},{},!0,n=>({vert:`
attribute vec4 a_position;
attribute vec2 a_uv;

varying vec2 uv;

void main() {
  uv = a_uv;
  gl_Position = a_position;
}`,frag:`
precision highp float;

${J}

varying vec2 uv;

uniform sampler2D u_tex;
uniform float u_t;
uniform float u_multiplier;

void main() {
  gl_FragColor = vec4(grain(u_tex, uv, vec2(${n.width}, ${n.height}), u_t, u_multiplier), 1.);
}`})).op,sn=Q({offset:["vec2",{x:.2,y:.2}],pct:["float",1]},{},!0,n=>({vert:`
attribute vec4 a_position;
attribute vec2 a_uv;

varying vec2 uv;

void main() {
  uv = a_uv;
  gl_Position = a_position;
}`,frag:`
precision highp float;

${nn}

varying vec2 uv;

uniform sampler2D u_tex;
uniform vec2 u_offset;
uniform float u_pct;

void main() {
  gl_FragColor = vec4(chromaAB(u_tex, uv, u_offset, u_pct), 1.);
}`})).op;var xn=`#ifndef FNC_ROTATE3D
#define FNC_ROTATE3D
mat3 rotate3d(in vec3 axis, in float radians) {
    axis = normalize(axis);
    float s = sin(radians);
    float c = cos(radians);
    float oc = 1.0 - c;

    return mat3(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c );
}
#endif`;function vn(n,e,o){return Object.fromEntries(Object.entries(e).map(([t,r])=>[t,{param:r,location:`u_${n()}_${t}`,signal:o[t]??g(r[1])}]))}function A(n,e,o){return(t,r)=>{const i=vn(n,e,r);return o(t,i)}}let ln=0;function _(){return`n${ln++}`}const un=A(_,{dimensions:["vec3",{x:1,y:1,z:1}]},({},n)=>e=>{const o=_();return[o,[{defs:[`float sdf_box(vec3 p, vec3 b) {
vec3 q = abs(p) - b;
return length(max(q, 0.)) + min(max(q.x, max(q.y, q.z)), 0.);
}`],decls:[{t:"float",lhs:o,rhs:`sdf_box(${e}, ${n.dimensions.location})`}],params:n}]]}),D=A(_,{radius:["float",1]},({},n)=>e=>{const o=_();return[o,[{defs:[],decls:[{t:"float",lhs:o,rhs:`length(${e}) - ${n.radius.location}`}],params:n}]]}),dn=A(_,{axis:["vec3",{x:0,y:1,z:0}],radians:["float",0]},(n,e)=>o=>{const t=_(),[r,i]=n(t);return[r,[{defs:[xn],decls:[{t:"vec3",lhs:t,rhs:`${o} * rotate3d(${e.axis.location}, ${e.radians.location})`}],params:e},...i]]}),q=A(_,{translate:["vec3",{x:0,y:0,z:0}]},(n,e)=>o=>{const t=_(),[r,i]=n(t);return[r,[{defs:[],decls:[{t:"vec3",lhs:t,rhs:`${o} - ${e.translate.location}`}],params:e},...i]]}),Y=A(_,{k:["float",.25]},(n,e)=>o=>{const[t,r]=n.sdf1(o),[i,c]=n.sdf2(o);return[`smin(${t}, ${i}, ${e.k.location})`,[...r,...c,{defs:[`float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}`],decls:[],params:e}]]}),gn=A(_,{k:["float",1]},(n,e)=>o=>{const t=_(),[r,i]=n(t);return[r,[{defs:[`vec3 twist(vec3 p, float k) {
  float c = cos(k*p.y);
  float s = sin(k*p.y);
  mat2  m = mat2(c,-s,s,c);
  return vec3(m*p.xz,p.y);
}
`],decls:[{t:"vec3",lhs:t,rhs:`twist(${o}, ${e.k.location})`}],params:e},...i]]}),yn={maxIterations:["int",64],fresnelBase:["float",1],fresnelExp:["float",5],mixFactor:["float",.5]};function mn(n,e,o){const t=n.gl,[r,i]=k(yn,o),c={...O,...e};let f=`
  precision highp float;

  varying vec2 uv;

  uniform int u_maxIterations;
  uniform float u_fresnelBase;
  uniform float u_fresnelExp;
  uniform float u_mixFactor;
`;const[d,u]=e.sdf("p"),y=new Set;for(let a of u)for(let x of a.defs)y.has(x)||(f+=`${x}

`,y.add(x));const s=new Set;for(let a of u)for(let x of Object.values(a.params))s.has(x.location)||(f+=`uniform ${x.param[0]} ${x.location};
`,s.add(x.location));f+=`
`,f+=`float sdf(vec3 p) {
`;for(let a of u)for(let x of a.decls)f+=`  ${x.t} ${x.lhs} = ${x.rhs};
`;f+=`
  return ${d};
}`,f+=`
        vec3 getNormal(vec3 pos) {
            const float eps = 0.0001;
            const vec2 h = vec2(1., -1.);
            return normalize(
                h.xyy * sdf(pos + h.xyy * eps) +
                h.yyx * sdf(pos + h.yyx * eps) +
                h.yxy * sdf(pos + h.yxy * eps) +
                h.xxx * sdf(pos + h.xxx * eps));
        }

        void main () {
            float aspect = ${c.width/c.height};
            vec2 pos = uv - 0.5;
            pos.x *= aspect;

            vec3 camPos = vec3(0.0, 0.0, 2.0);
            vec3 ray = normalize(vec3(pos, -1));

            float t = 0.0;
            float tMax = 5.0;

            for (int i = 0; i < 64; ++i) {
                if (i >= u_maxIterations) break;
                vec3 currentPos = camPos + (t * ray);
                float h = sdf(currentPos);
                if (h < 0.0001 || t > tMax) break;
                t += h;
            }

            vec3 color = vec3(0.0);

            if (t < tMax) {
                vec3 currentPos = camPos + (t * ray);
                vec3 normal = getNormal(currentPos);
                float diff = dot(vec3(1.0), normal);

                float fresnel = pow(u_fresnelBase + dot(ray, normal), u_fresnelExp);

                color = vec3(fresnel);
                color = mix(color, vec3(u_mixFactor), fresnel);
            }

            // float grainAmount = filmGrain(uv * u_time) * 0.1;
            // gl_FragColor = vec4(color - grainAmount, 1.0);
            gl_FragColor = vec4(color, 1.0);
        }
`;const v=V(t,`
attribute vec4 a_position;
attribute vec2 a_uv;

varying vec2 uv;

void main() {
  uv = a_uv;
  gl_Position = a_position;
}`,f),w=t.getAttribLocation(v,"a_position"),p=t.getAttribLocation(v,"a_uv"),z={};for(let a of s)z[a]=t.getUniformLocation(v,a);const S=t.getUniformLocation(v,"u_maxIterations"),N=t.getUniformLocation(v,"u_fresnelBase"),E=t.getUniformLocation(v,"u_fresnelExp"),M=t.getUniformLocation(v,"u_mixFactor");function B(a){t.useProgram(v);let x=0;for(let Z of u)for(let L of Object.values(Z.params))x=G(t,L.param[0],z[L.location],L.signal.value(a),x)}const[R,C]=H(n.gl,c);return{render:X(a=>{C(),B(a);const x=r(a);t.uniform1i(S,x.maxIterations),t.uniform1f(N,x.fresnelBase),t.uniform1f(E,x.fresnelExp),t.uniform1f(M,x.mixFactor),U(n,{a_position:w,a_uv:p})}),out:R}}function _n(n,e,o){const t=b(123455,1,100),r=b(123455,5,10),i=b(123455,.5,100),c=b(1348347,.05,2),f=b(148347,5,100),d={x:.25,y:.25,z:.25};async function*u(){await P(2e3),yield i.zip(r).map(([l,a])=>({x:l,y:a,z:.35})),await P(2e3),yield g(d),yield*u()}const y=un({},{dimensions:I(g(d),u)}),s=gn(dn(y,{axis:g({x:1,y:1,z:1}),radians:f.map(Math.floor)}),{k:g(.5)});async function*m(){yield F.map(l=>({x:(l-Math.floor(l))/2,y:0,z:0})),await P(3500),yield F.map(l=>({x:0,y:-(l-Math.floor(l))/2,z:0})),await P(2500),yield F.map(l=>({x:-(l-Math.floor(l))/2,y:0,z:0})),await P(2500),yield*m()}const v=q(D({},{radius:c.map(l=>l+.25)}),{translate:I(g({x:0,y:0,z:0}),m)}),w=q(D({},{radius:g(.25)}),{translate:g({x:0,y:.4,z:0})}),p=Y({sdf1:Y({sdf1:s,sdf2:v},{}),sdf2:w},{k:t});async function*z(){await P(1e3),yield f.map(l=>l+1),await P(3e3),yield g(10),yield*z()}const S=mn(e,{...n,sdf:p},{maxIterations:I(g(10),z),mixFactor:g(.8)}),N=sn(e,{...n,tex:S},{offset:g({x:.3,y:.3})}),E=fn(e,{...n,tex:N},{t:F,multiplier:g(25)}),{render:M}=an(e,E.out,0,0,1);function B(l){const a=e.gl;E.render(l),a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,a.canvas.width,a.canvas.height),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),M()}let R=0;function C(l){B(R),R++,requestAnimationFrame(()=>C())}return()=>C()}function pn(){const n=rn(),e=document.getElementById("canvas");e.width=window.innerWidth,e.height=window.innerHeight,e.addEventListener("click",()=>{e.requestFullscreen?e.requestFullscreen({navigationUI:"hide"}):e.webkitRequestFullscreen&&e.webkitRequestFullscreen(),e.requestPointerLock&&e.requestPointerLock()});const o={width:e.width,height:e.height,format:"byte"};_n(o,n)()}pn();
