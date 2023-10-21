想要进行精准搜索，无非就是增加筛选条件

- in:name xxx // 按照项目名搜索
- in:readme xxx // 按照README搜索
- in:description xxx // 按照description搜索

那么在这里面呢，我们又可以增加筛选条件

- stars:>xxx // stars数大于xxx
- forks:>3000 // forks数大于xxx
- language:xxx // 编程语言是xxx
- pushed:>YYYY-MM-DD // 最后更新时间大于YYYY-MM-DD



**EG:**

- `in:name React stars:>5000 forks:>3000`：搜索项目名里面包含React的项目，并且starts数超过5000，forks数超过3000
- `in:readme React stars:>3000 forks:>3000`：搜索README.md里面包含React的项目，并且starts数超过3000，forks数超过3000
- `in:description 微服务 language:python pushed:>2020-01-01`：搜索项目描述(description)里面包含微服务的项目，并且编程语言为python，最后更新时间在2020-01-01之后