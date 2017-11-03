#!/bin/bash

name1=node1
value1=hello.world.node1

name2=node2
value2=hello.world.node2

name3=node1
value3=hello.world.node3

echo "name1:" $name1
echo "value1:" $value1
echo "name2:" $name2
echo "value2:" $value2
echo "name3:" $name3
echo "value3:" $value3

aws ssm put-parameter --name /tdd/foo/$name1 --value "$value1" --type String
aws ssm put-parameter --name /tdd/foo/$name2 --value "$value2" --type String
aws ssm put-parameter --name /tdd/bar/$name3 --value "$value3" --type String
