interface EmployeeProps {
    job?: string
    imageUrl?: string
    location?: string
    email?: string
    phone?: string
}

export default class NTIEmployee {
    
    public name: string;
    public job: string|null;
    public imageUrl: string|null;
    public location: string|null;
    public email: string|null;
    public phone: string|null;

    constructor(name: string, props: EmployeeProps) {
        this.name = name;
        this.job = props.job || null;
        this.imageUrl = props.imageUrl || null;
        this.location = props.location || null;
        this.email = props.email || null;
        this.phone = props.phone || null;
    }

}