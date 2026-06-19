import { API_URL } from "../../support/constants";
import { faker } from '@faker-js/faker'

describe('Booking API', () => {

    it('GET /booking - returns a list of bookings', () => {
        cy.request(`${API_URL}/booking`).then(response => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
        })
    });

    it('GET /booking/:id - returns a single booking', () => {
        cy.request(`${API_URL}/booking`).then((listResponse) => {
            const bookingId = listResponse.body[0].bookingid

            cy.request(`${API_URL}/booking/${bookingId}`).then((response) => {
                const bookingDates = response.body.bookingdates

                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('firstname')
                expect(response.body).to.have.property('lastname')
                expect(response.body).to.have.property('totalprice')
                expect(response.body).to.have.property('depositpaid')
                expect(response.body).to.have.property('bookingdates')

                expect(bookingDates).to.have.property('checkin')
                expect(bookingDates).to.have.property('checkout')


            })
        })
    });



    it('POST /booking - creates a new booking', () => {
        const newBooking = {
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
            totalprice: faker.number.int({ min: 100, max: 500 }),
            depositpaid: true,
            bookingdates: {
                checkin: '2025-01-01',
                checkout: '2025-01-07',
            },
        }

        cy.request({
            method: 'POST',
            url: `${API_URL}/booking`,
            body: newBooking,
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('bookingid')
            expect(response.body).to.have.property('booking')
        })
    })





    it('PUT /booking/:id - updates a booking', () => {
        cy.getToken().then((token) => {
            cy.request(`${API_URL}/booking`).then((listResponse) => {
                const bookingId = listResponse.body[0].bookingid

                const updatedBooking = {
                    firstname: faker.person.firstName(),
                    lastname: faker.person.lastName(),
                    totalprice: faker.number.int({ min: 100, max: 500 }),
                    depositpaid: false,
                    bookingdates: {
                        checkin: '2025-06-01',
                        checkout: '2025-06-07',
                    }
                }

                cy.request({
                    method: 'PUT',
                    url: `${API_URL}/booking/${bookingId}`,
                    body: updatedBooking,
                    headers: {
                        'Content-Type': 'application/json',
                        'Cookie': `token=${token}`
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('firstname').and.eq(updatedBooking.firstname)
                    expect(response.body).to.have.property('totalprice').and.eq(updatedBooking.totalprice)
                })
            })
        })
    });



    it('DELETE /booking/:id - deletes a booking', () => {
        cy.getToken().then((token) => {
            cy.request(`${API_URL}/booking`).then((listResponse) => {
                const bookingId = listResponse.body[0].bookingid


                cy.request({
                    method: 'DELETE',
                    url: `${API_URL}/booking/${bookingId}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'Cookie': `token=${token}`
                    }
                }).then((response) => {
                    expect(response.status).to.eq(201)
                })
                cy.request({
                    url: `${API_URL}/booking/${bookingId}`,
                    failOnStatusCode: false
                }).then(response => {
                    expect(response.status).to.eq(404)
                })
            })
        })
    })
});
