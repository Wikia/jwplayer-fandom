// knife search roles:cdn-node* -a hostname | grep hostname | awk '{print $2}' | sort | sed "s/\(.*\)/\t'\1',/g"
export const NODES: Array<string> = [
	'wk-cdn-f1',
	'wk-cdn-f2',
	'wk-cdn-f3',
	'wk-cdn-f4',
	'wk-cdn-f5',
	'wk-cdn-f6',
	'wk-cdn-r1',
	'wk-cdn-r11',
	'wk-cdn-r12',
	'wk-cdn-r13',
	'wk-cdn-r14',
	'wk-cdn-r2',
	'wk-cdn-r3',
	'wk-cdn-r4',
	'wk-cdn-r5',
	'wk-cdn-r6',
	'wk-cdn-r7',
	'wk-cdn-r8',
	'wk-cdn-r9',
	'wk-cdn-s10',
	'wk-cdn-s11',
	'wk-cdn-s12',
	'wk-cdn-s13',
	'wk-cdn-s14',
	'wk-cdn-s2',
	'wk-cdn-s3',
	'wk-cdn-s5',
	'wk-cdn-s6',
	'wk-cdn-s7',
	'wk-cdn-s8',
	'wk-cdn-s9',
];
