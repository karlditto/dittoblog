---
title: 'Oracle的sql parser'
description: "Introduction to oracle's sql parser"
pubDate: 'Sep 07 2026'
heroImage: '../../assets/blog-placeholder-2.jpg'
---

## Background

市面上有很多sql parser, oracle自己也有(废话)而且普通用户也可以想办法使用. 接下来我会说明方法.

## Dependencies

oracle的sql parser封装在sql developer和Sqlcl所依赖的jar中. 本文涉及的jar是`dbtools-arbori.jar`和`dbtools-common.jar`, 读者可以尝试从sql developer根目录的`sqldeveloper/lib`中获取. 这里使用的是SQL Developer 26.2.

## Usage

java代码如下:

```java
import java.io.IOException;
import java.util.*;
import oracle.dbtools.parser.LexerToken;
import oracle.dbtools.parser.Matrix;
import oracle.dbtools.parser.ParseNode;
import oracle.dbtools.parser.plsql.SqlEarley;
import oracle.dbtools.parser.Lexer;

public class sqlparser {
  public static void main(String args[]) throws IOException {
    String input = "SELECT e.employee_id " +
        "FROM employees e";
    if (1 == args.length) {
      input = args[0];
    }
    List<LexerToken> tokens = Lexer.parse(input);
    System.out.println("======== Tokens ========");
    LexerToken.print(tokens);
    System.out.println("");

    SqlEarley earley = SqlEarley.getInstance();
    Matrix matrix = new Matrix(earley);
    earley.parse(tokens, matrix);
    ParseNode root = earley.forest(tokens, matrix);
    System.out.println("======== Abstract Syntax Tree ========");
    root.printTree();
  }
}
```

## Result

```
======== Tokens ========
0    [0,6) SELECT   <IDENTIFIER>
1    [7,8) e   <IDENTIFIER>
2    [8,9) .   <OPERATION>
3    [9,20) employee_id   <IDENTIFIER>
4    [21,25) FROM   <IDENTIFIER>
5    [26,35) employees   <IDENTIFIER>
6    [36,37) e   <IDENTIFIER>

======== Abstract Syntax Tree ========
[0,7)   query_block  select  subquery
  [0,4)   select_clause
    [0,1)   'SELECT'
    [1,4)   column  expr  expr#  select_list  select_term  simple_expression
      [1,3)   column___0
        [1,2)   identifier  table
        [2,3)   '.'
      [3,4)   identifier
  [4,7)   from_clause
    [4,5)   'FROM'
    [5,7)   cartesian_product  table_reference  table_reference_or_join_clause
      [5,6)   identifier  query_table_expression  table_reference___2  table_reference___3
      [6,7)   identifier
```
