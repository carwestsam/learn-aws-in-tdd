# Play with Parameter store

https://aws.amazon.com/ec2/systems-manager/parameter-store/

http://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-working.html

http://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-paramstore.html

### Hints

if you can not find your parameter, check your region configuration ~/.aws/config

All of output should be formated as json

## Tasks

#### 3.3 create parameters in directoy

*create_parameters_in_path*

* create parameter name $name1 value $value1 in directory /tdd/foo
* create parameter name $name2 value $value2 in directory /tdd/foo
* create parameter name $name3 value $value3 in directory /tdd/bar

*fetch_parameters_in_path*

* fetch_parameters_in_directory /tdd/

