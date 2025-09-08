class Contador {
    private cuenta: number = 0;

    public incrementar(): void {
        if (this.cuenta >= 10) {
            this.cuenta++;
        }
    }

}
