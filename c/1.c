#include <stdio.h>
#include <stdlib.h>

int p1();
int p2();

int main(int argc, char *argv[]) {
	if (argc != 2) {
		printf("Usage: %s <part>\n", argv[0]);
		return 1;
	}

	int part = atoi(argv[1]);

	switch (part) {
	case 1:
		printf("%d\n", p1());
		break;
	case 2:
		printf("%d\n", p2());
		break;
	default:
		printf("Invalid part: %d\n", part);
		return 1;
	}

	return 0;
}

int p1() {
	FILE *f = fopen("../tests/1/input.txt", "r");
	if (!f) {
		perror("file");
		return -1;
	}

	char *l = NULL;
	size_t len = 0;
	unsigned int largest = 0, cur = 0;

	while (getline(&l, &len, f) != EOF) {
		if (l[0] == '\n') {
			if (cur > largest)
				largest = cur;
			cur = 0;
		} else {
			cur += (unsigned short)atoi(l);
		}
	}

	fclose(f);

	return largest;
}

int p2() {
	printf("not implemented\n");
	return -1;
}
