export function archivoABase64(archivo: File) {
    return new Promise((resolver, rechazar) => {
        const lector = new FileReader();
        lector.readAsDataURL(archivo);
        lector.onload = () => resolver(lector.result);
        lector.onerror = (error) => rechazar(error);
    })
}

export function formatearFecha(fecha: Date) {
    fecha = new Date(fecha);
    const formato = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const [{ value: mes }, , { value: dia }, , { value: anho }] = formato.formatToParts(fecha);
    return `${anho}-${mes}-${dia}`;
}

export function parsearErroresApi(respuesta: any): string[] {
    const resultado: string[] = [];

    if (respuesta.error) {
        if (typeof respuesta.error === 'string') {
            resultado.push(respuesta.error);

        } else if (Array.isArray(respuesta.error)) {
            respuesta.error.forEach((valor: { description: string; }) => resultado.push(valor.description));

        } else {
            const mapaErrores = respuesta.error.errors;
            const entradas = Object.entries(mapaErrores);

            entradas.forEach((array: any[]) => {
                const campo = array[0];

                array[1].forEach((mensajeError: any) => {
                    resultado.push(`${campo}: ${mensajeError}`);
                });
            });
        }
    }

    return resultado;
}
