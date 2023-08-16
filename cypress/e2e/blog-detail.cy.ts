describe('SingleBlog Component', () => {
    it('displays blog details and performs actions', () => {
      cy.visit('/'); 
  
      cy.get('.cursor-pointer').first().then(($link) => {
        const href = $link.attr('href');
        
        if (href) {
          const blogId = href.split('/').pop(); 
          cy.visit(`/blog/${blogId}`);
  
          cy.get('.text-3xl').should('be.visible');
          cy.get('.mb-4').should('be.visible');
          cy.get('.mt-48').should('be.visible');
  
        cy.request('GET', `http://localhost:3004/blogs/${blogId}`).then((response) => {
        const blogDetails = response.body;

        cy.contains('Edit').click();
        cy.get('[type="submit"]').should('be.visible');

        cy.get('[type="text"]').clear().type('Updated Title');
        cy.get('textarea').clear().type('Updated Content');
        cy.get('[type="submit"]').click();

       
        cy.contains(blogDetails.title).should('be.visible');
        cy.contains(blogDetails.content).should('be.visible');

        cy.contains('Delete').click();
        cy.url().should('include', '/'); 
        cy.contains('Deleted Successfully').should('be.visible');
      });
    }});
  });
});