#include <stdio.h>

int main() {
    int a,b,c,d;
    scanf("%d %d %d %d",&a,&b,&c,&d);
    if(d==a+b-c ||d==a+b*c ||d==a-b*c||d==a-b+c ||d==a*b+c  ||d==a*b-c )
    {
        printf("YES");
    }
    else{
        printf("NO");
    }
    return 0;

}
