import { Blog } from "@/models/type";

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
 
  it('List of Blogs', () => {
    cy.request('GET', 'http://localhost:3004/blogs').then((response) => {
      const blogs = response.body;

      cy.get('.text-3xl').should('contain', 'Blog List');
      cy.get('.cursor-pointer').should('have.length', blogs.length);

      blogs.forEach((blog:Blog) => {
        cy.get('.cursor-pointer').contains(blog.title);
      });
    });
  });
  
  it('navigates to blog detail when a blog title is clicked', () => {
    cy.get('.cursor-pointer').first().click();
    cy.url().should('include', '/blog/');
  });

  it('submits the form and adds a new blog', () => {
   
    cy.get('[placeholder="Title"]').type('New Blog Title');
    cy.get('[placeholder="Content"]').type('New Blog Content');

    cy.get('[type="submit"]').click();
    cy.contains('New Blog Title').should('be.visible');
  });
  
});
