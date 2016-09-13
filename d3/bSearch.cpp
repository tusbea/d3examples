#include <stdio.h>

#define MAX_M 100

int T;    // # of test case
int M;    // # of element in array
int N;    // # of numbers to search
int arr[MAX_M];

void binarySearch(int* arr, int low, int high, int target)
{
    int mid;
    if (low > high) 
    {
        printf("-1 ");
        return;
    }

    mid = (low + high) / 2;

    if (target < arr[mid])
    {
        binarySearch(arr, low, mid - 1, target);
    }
    else if (arr[mid] < target)
    {
        binarySearch(arr, mid + 1, high, target);
    }
    else 
    {
        printf("%d ", mid);
        return;
    }
}

int main(void)
{
    int targetValue;
    scanf("%d", &T);

    for (int test_case = 1; test_case <= T; test_case++) 
    {
        printf("#%d ", test_case);
        scanf("%d %d", &M, &N);

        for (int i = 0; i < M; i++)
        {
            scanf("%d", &arr[i]);
        }

        for (int i = 0; i < N; i++) 
        {
            scanf("%d", &targetValue);
            binarySearch(arr, 0, M-1, targetValue);
        }
        printf("\n");
    }
    return 0;
}