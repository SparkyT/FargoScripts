<?xml version="1.0" encoding="UTF-8"?>
<!-- 
    Created by: Rob Ballou (http://robballou.com)
    Version: 0.1
    License: MIT
    
    Copyright (c) 2008 Rob Ballou

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <!-- Base -->
    <xsl:template match="/">
        <html>
            <head><title>Outline</title></head>
            <body>
                <ol>
                    <xsl:apply-templates select="/opml/body/outline"/>
                </ol>
            </body>
        </html>
    </xsl:template>
    <!-- Show the outline nodes -->
    <xsl:template match="outline">
        <li><xsl:value-of select="@text" /><xsl:if test="@_note"> [<xsl:value-of select="@_note" />]</xsl:if>
            <xsl:if test="count(child::outline) > 0">
            <!-- Show child outline nodes -->
            <ol>
                <xsl:apply-templates select="child::outline"/>
            </ol>
            </xsl:if>
        </li>
    </xsl:template>
</xsl:stylesheet>
